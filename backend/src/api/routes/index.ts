import { Router } from "express";
import { glob } from "glob";
import path from "path"

export function registerRoutes(router: Router): void {
    const routes = glob.sync(`${__dirname}/**/*route.js`)

    routes.map(route => register(route, router))
}

function register(routePath: string, router: Router) {
    const fullPath = path.resolve(routePath);
    const { register } = require(fullPath) as { register: (router: Router) => void };
	register(router);
}