import "reflect-metadata";
import "module-alias/register";
import express, { Request, Response } from 'express'
import { InversifyExpressServer } from "inversify-express-utils";
import container from "@config/inversify";
import "@api/controllers";
import Database from "@config/database";
import { createConnection } from "typeorm";
import errorHandler from "@api/utils/error-handler";
import swaggerUi from "swagger-ui-express";
import { specs } from "@config/swagger"
import path from "path";

const server = new InversifyExpressServer(container);
server.setConfig(app => {
	app.options('*', (req, res, next) => { next(); });
	app.use(
		express.urlencoded({
			extended: true
		})
	);
	app.use(express.json());
	app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
	app.use (function (err: any, req: any, res: any, next: any){
		return errorHandler(err, res);
	});
});

const app = server.build();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req: Request, res: Response) => res.json({ status: 'Pokemon REST API runing ok' }))

const PORT = 3000

const start = async () => {
	try {
		Database.setConnection(await createConnection());
		app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
	} catch (err) {
		throw err
	}
};

start();

