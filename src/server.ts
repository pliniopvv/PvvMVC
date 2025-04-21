// IMPORTS
import "reflect-metadata";
import { config } from 'dotenv';
config({ path: '.env.development' });
import { container } from './infra/Kernel';
import pino from "pino";
import { pinoHttp } from 'pino-http';
import express from 'express';

// CONSTANTS
const port = process.env.PORT || 3000;
const app = express();

// EXPRESS CONFIG
app.use(pinoHttp());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// LOGGER CONFIG
const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
});


// INVERSIFYJS CONFIG
container.bind('App').toConstantValue(app);
logger.level = process.env.LOG_LEVEL || 'info';
container.bind("Logger").toConstantValue(logger);

// MYAUTOIMPORTS CONFIG
import "./shared/model/index";
import "./shared/repository/index";
import "./shared/service/index";
import "./routers/index";
import { AppDataSource } from "./infra/db/data-source";
import path from "path";

// DATABASE CONFIG
const database = AppDataSource;
container.bind('Database').toConstantValue(database);

// START SERVER
app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`);
});

logger.info("### Fim");