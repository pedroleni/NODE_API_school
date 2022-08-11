const Teacher = require('./teacher.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
  try {
    const teacher = await Teacher.find().populate("subjects");
    return res.json({
      status: 200,
      message: 'Recovered all teachers',
      data: { teacher }
    });
  } catch (error) {
    return next(setError(500, 'Failed all teachers'));
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const teacher = await Teacher.findById(id).populate("subjects");
    if (!teacher) return next(setError(404, 'Teacher not found'))
    return res.json({
      status: 200,
      message: 'Recovered teacher by id',
      data: { teacher }
    });
  } catch (error) {
    return next(setError(500, 'Failed teacher by id'))
  }
}

const create = async (req, res, next) => {
  try {
    const teacherToSave = new Teacher(req.body)
    const teacherInDb = await teacherToSave.save()
    return res.json({
      status: 201,
      message: 'Created new teacher',
      data: { teacherInDb }
    });
  } catch (error) {
    return next(setError(500, 'Failed created teacher'))
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = new Teacher(req.body);
    teacher._id = id;
    const teacherSubject = await Teacher.findByIdAndUpdate(id, teacher);
    if (!teacher) return next(setError(404, 'Teacher not found'))
    return res.json({
      status: 200,
      message: 'Updated teacher by id',
      data: { teacherSubject }
    });
  } catch (error) {
    return next(setError(500, 'Failed teacher Update by id'))
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacherRemoved = await Teacher.findByIdAndDelete(id);
    if (!teacherRemoved) return next(setError(404, 'Teacher not found'));
    return res.json({
      status: 200,
      message: 'Removed teacher by id',
      data: { teacherRemoved }
    });
  } catch (error) {
    return next(setError(500, 'Failed teacher Remove by id'))
  }
}


module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
}