const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/createtask', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
