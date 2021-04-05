// importaciones necesarias
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { getVariable } from './config';
import indexRouter from './modules/core/routes/index.router';


// Declaraciòn de variables 

const app = express();
const fullAPiPath = `${getVariable('API_PATH')}/v1/account/transaction/`;


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static'))); // para el OAS
app.use(cors({}));

app.use('/api/', indexRouter);
//app.use(fullAPiPath, balancesRouter);

app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: {
            data: err.data,
            message: err.message,
            name: err.name,
        },
    });
});

app.use((req, res) => {
    return res.status(404).send({message: `Route '${req.url}' Not found.`});
});

export default app;