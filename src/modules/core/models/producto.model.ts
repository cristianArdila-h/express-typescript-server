import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']

    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    descripcion:{
        type: String,
        required: false
    }, 
    stock:{
        type: Number,
        required: true,
        default: 0
    }, 
    precio:{
        type: Number,
        required: true,
        default: 0
    }, 
    imagen: {
        type: String,
        required: true,
        default: 'https://cdn.iconscout.com/icon/free/png-512/data-not-found-1965034-1662569.png'
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categorias', 
        required: true
    }
});
ProductSchema.methods.toJSON = function(){
    const {__v,  ...data } = this.toObject();
    return data;
};

export default  model('Producto', ProductSchema);