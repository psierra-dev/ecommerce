import 'reflect-metadata';
import * as http from 'http';
import express, { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import errorHandler from "errorhandler"
import morgan from "morgan"
import cors from "cors"
import Router from "express-promise-router"
import httpStatus from 'http-status';
import LoggerInstance from './shared/utils/logger';
import { registerRoutes } from './api/routes';
import { boomErrorHandler, errorServer, logErrors, ormErrorHandler } from './api/middleware/errorHandler';

export class Server {
    private readonly express: express.Express;
	private readonly port: string;
	private httpServer?: http.Server;

    constructor(port: string) {
        this.port = port
        this.express = express()
        this.express.use(morgan("dev"));
        this.express.use(cors())
        this.express.use(json());
		this.express.use(urlencoded({ extended: true }));

        const router = Router()
        //Usar solo en desarrollo
        router.use(errorHandler())
        this.express.use(router)
        router.use("/api/v1", router)
        registerRoutes(router)

        router.use(logErrors);
        router.use(ormErrorHandler);
        router.use(boomErrorHandler);
        router.use(errorServer)
		
    }

    async listen(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = this.express.listen(this.port, () => {
                LoggerInstance.info(`server listening in port ${this.port}`)
            
                resolve()
            })
        })
    }

    getHTTPServer(): Server['httpServer'] {
		return this.httpServer;
	}

    async stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (this.httpServer) {
				this.httpServer.close(error => {
					if (error) {
						reject(error);

						return;
					}

					resolve();
				});
			}

			resolve();
		});
	}


}