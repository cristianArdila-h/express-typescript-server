import { request, response } from "express";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';
class ValidarCampos {

    constructor() { }

    /**
     * Valida los campos obligatorios
     */
    public validador = (req: Request, res: Response, next: NextFunction) =>  {
        const errors= validationResult(req);
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors);
        }
        next();
    }
}

const validarCampos = new ValidarCampos();
export default validarCampos.validador;
