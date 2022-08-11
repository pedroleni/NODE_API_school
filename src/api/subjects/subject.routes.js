const SubjectRoutes = require('express').Router();
const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('./subject.controller');

SubjectRoutes.get('/', getAll)
SubjectRoutes.get('/:id', getById)
SubjectRoutes.post('/', create)
SubjectRoutes.patch('/update/:id', update)
SubjectRoutes.delete('/delete/:id', remove)


module.exports = SubjectRoutes;