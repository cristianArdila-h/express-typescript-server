import { Router } from 'express';
import { check } from "express-validator";
import { LIST_MOVEMENTS } from "../../../../test/mocks/movements.mock";
import validarCampos from '../middleware/validar-campos';
import CategoriaController from '../controllers/categorias.controller';
import ProductoController from '../controllers/productos.controller';

import dbValidators from '../helpers/db-validators';



class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {

        this.router.get('/listCategory',  CategoriaController.obtenerCategorias);

        this.router.get('/getCategory/:id', [
            check('id', 'No es un id valido').custom(dbValidators.ExisteCategoriaporId), 
            validarCampos
        ], CategoriaController.obtenerCategoria);

        this.router.post('/createCategory', 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
        validarCampos, CategoriaController.crearCategoria);

        this.router.put('/updateCategory/:id', 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('id', 'No es un id valido').custom(dbValidators.ExisteCategoriaporId), 
        validarCampos,
        CategoriaController.actualizarCategoria);

        this.router.delete('/deleteCategory/:id', 
        check('id', 'No es un id valido').custom(dbValidators.ExisteCategoriaporId), 
        validarCampos,
         CategoriaController.deleteCategoria);
          /**
          * Rutas de productos ----------------------------------------------
          */

        // this.router.get('/listCategory',  {'id': 'asd'});

       // this.router.get('/getCategory/:id', ....);

        this.router.post('/createProduct',  
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos, ProductoController.crearProducto);

        this.router.get('/listProducts',  ProductoController.listProduct);
        // this.router.put('/updateCategory/:id',         );
 
         // this.router.delete('/deleteCategory/:id', ...);
     
       
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;
