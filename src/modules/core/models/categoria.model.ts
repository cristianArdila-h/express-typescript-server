import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
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
    imagen: {
        type: String,
        required: true,
        default: 'https://cdn.iconscout.com/icon/free/png-512/data-not-found-1965034-1662569.png'
    }
});
CategorySchema.methods.toJSON = function(){
    const {__v,  ...data } = this.toObject();
    return data;
};

export default  model('Categoria', CategorySchema);