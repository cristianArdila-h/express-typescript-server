import { Request, Response } from 'express';
import Producto from '../models/producto.model';
import Categoria from '../models/categoria.model';


class ProductoController {

    constructor() { }

    public crearProducto = async (req: Request, res: Response) => {
        const nombre = req.body.nombre;
        const idCategoria = req.body.idCategoria;
        const productoDb = await Producto.findOne({ nombre });
        const validateCategoria = await this.validaCategoria(idCategoria);
        if (!validateCategoria) {
            return res.status(400).json({ msg: `no existe la categoria seleccionada.` });
        }
        if (productoDb != null) {
            if (productoDb.nombre == nombre) {
                return res.status(400).json({ msg: `Ya existe el producto ${nombre} en la base de datos.` });
            }
        }
        const data = {
            nombre,
            descripcion: req.body.descripcion,
            stock: req.body.stock,
            precio: req.body.precio,
            imagen: req.body.imagen,
            categoria: req.body.idCategoria
        };

        const producto = new Producto(data);
        await producto.save(); 
        res.status(201).json(producto);
    }

    public listProduct = async (req: Request, res: Response) => {
        console.log(req.query);
        const {limite = 20, desde = 0} = req.query;
        const categoriaParam = req.query.categoria;
        console.log('categoria parametro: ', categoriaParam);
        const validateCategoria = await this.validaCategoria(categoriaParam);
        if (validateCategoria) {                    
        const query = {estado : true, categoria: categoriaParam};
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
        ]);
        
        res.json({
            total,
            productos
        });
        } else {
            return res.status(400).json({ msg: `la categoria ${categoriaParam} no existe.` });
        }

    }

    private validaCategoria = async (id: any ) => {
        const existeCategoria = await Categoria.findById(id);
        if (existeCategoria != null) {
            if (existeCategoria.estado) {
                return true;
            } 
        }else {
            return false;
        }
    }
}

const productController = new ProductoController();
export default productController;
