const CourseRoutes = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
} = require('./course.controller');

CourseRoutes.get('/', getAll)
CourseRoutes.get('/:id', getById)
CourseRoutes.get('/name/:name', getByName)
CourseRoutes.post('/', create)
CourseRoutes.patch('/update/:id', update)
CourseRoutes.delete('/delete/:id', remove)


module.exports = CourseRoutes;