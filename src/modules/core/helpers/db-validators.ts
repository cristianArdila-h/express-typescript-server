import { validationResult } from "express-validator";
import Categoria from '../models/categoria.model';

class DbValidators {

    constructor() { }

    public ExisteCategoriaporId = async ( id: string ) =>  {
        const existeCategoria = await Categoria.findById(id);
        if (!existeCategoria) {
            throw new Error(`El id no existe ${id}`);
        }
    }
}

const dbValidators = new DbValidators();
export default dbValidators;
