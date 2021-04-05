import { Request, Response } from 'express';
import Categoria from '../models/categoria.model';

class CategoriaController {

    constructor() { }

    public crearCategoria = async (req: Request, res: Response) => {
        const nombre = req.body.nombre;
        const categoriaDb = await Categoria.findOne({ nombre });
        console.log(categoriaDb);
        if (categoriaDb != null) {
            if (categoriaDb.nombre == nombre) {
                return res.status(400).json({ msg: `Ya existe la categoria ${nombre} en la base de datos.` });
            }
        }

        const data = {
            nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        };

        const categoria = new Categoria(data);

        await categoria.save(); // guardar en BD

        res.status(201).json(categoria);
    }

    public obtenerCategorias = async (req: Request, res: Response ) => {
        const {limite = 20, desde = 0} = req.query;
        const query = {estado : true};

        const [total, categoriasDb] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find( query )
            .skip(Number( desde ))
            .limit(Number( limite ))
        ]);
        res.json({
            total,
            categoriasDb
        });
        //await Categoria.listIndexes;
    } 
    /**
     * obtenerCategoria async
     */
    public obtenerCategoria = async( req: Request, res: Response ) => {
        const { id } = req.params;
        const categoria =  await Categoria.findById( id );

        res.json( categoria );
    }
    public actualizarCategoria = async( req: Request, res: Response ) => {
        const { id } = req.params;
        const {estado, ...data} = req.body;
        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
        res.json(categoria);

    }
    public deleteCategoria = async( req: Request, res: Response ) => {
        const { id } = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false} , {new: true});
        res.json(categoria);

    }
}

const categoriaController = new CategoriaController();
export default categoriaController;
