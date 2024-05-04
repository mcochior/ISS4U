import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    modulo_di_riferimento: { type: String, required: true },
    descrizione: { type: String, required: true },
    data_inizio: { type: String, required: true },
    data_fine: { type: String, required: true },
    completamento: { type: Boolean, required: true },


});

export const TaskModel = mongoose.model('Task', TaskSchema)
