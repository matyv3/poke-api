import "reflect-metadata";
import * as bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify";
import "./api/controllers";

const server = new InversifyExpressServer(container);
server.setConfig(app => {
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
	app.use(bodyParser.json());
	app.use (function (err: any, req: any, res: any, next: any){
		//return errorHandler(err, res);
		return res.send('error')
	});
});

const app = server.build();

const PORT = 3000

const start = async () => {
	//try {
		//Database.setConnection(await createConnection());
	//} catch (err) {
	//}
	app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
};

start();

