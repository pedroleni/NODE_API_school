const TeacherRoutes = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('./teacher.controller');

TeacherRoutes.get('/', getAll)
TeacherRoutes.get('/:id', getById)
TeacherRoutes.post('/', create)
TeacherRoutes.patch('/update/:id', update)
TeacherRoutes.delete('/delete/:id', remove)


module.exports = TeacherRoutes;