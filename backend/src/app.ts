import 'reflect-metadata';
//import sequelize from './providers/database/models';
import { Server } from './server';
import sequelize from './shared/infrastructure/orm/models';
import LoggerInstance from './shared/utils/logger';

export class EcommerceApp {
    server: Server

    async start() {
        const port = process.env.PORT || "3001"
        require('./shared/utils/dependencyinjection').default({models: sequelize.models})
        this.server = new Server(port)
        await sequelize.authenticate()
        LoggerInstance.info("injection")
        return this.server.listen()
    }

    get httpServer(): Server['httpServer'] | undefined {
        return this.server?.getHTTPServer();
    }

    async stop(): Promise<void> {
        return this.server?.stop()
    }
}
