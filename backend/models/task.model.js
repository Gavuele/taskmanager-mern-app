const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
