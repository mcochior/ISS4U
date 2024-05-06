import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    modulo_di_riferimento: { type: String, required: true },
    descrizione: { type: String, required: true },
    data_inizio: { type: Date, required: true },
    data_fine: { type: Date, required: true },
    completamento: { type: Boolean, required: true },


});

export const TaskModel = mongoose.model('Task', TaskSchema)

export const getTasks = () => TaskModel.find();
export const getTaskByName = (nome: string) => TaskModel.findOne({nome});

export const createTask = (values: Record<string, any>) => new TaskModel(values).save().then((task) => task.toObject());
export const deleteTaskByNome = (nome: string) => TaskModel.findOneAndDelete({ _nome: nome});
export const updateTaskByNome = (nome: string, values: Record<string, any>) => TaskModel.findByIdAndUpdate(nome, values)

