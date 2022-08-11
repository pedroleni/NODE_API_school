const StudentRoutes = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('./student.controller');

StudentRoutes.get('/', getAll)
StudentRoutes.get('/:id', getById)
StudentRoutes.post('/', create)
StudentRoutes.patch('/update/:id', update)
StudentRoutes.delete('/delete/:id', remove)


module.exports = StudentRoutes;