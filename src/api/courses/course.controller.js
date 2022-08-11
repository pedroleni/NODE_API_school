const Course = require('./course.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("subjects students");
    return res.json({
      status: 200,
      message: 'Recovered all courses',
      data: { courses }
    });
  } catch (error) {
    return next(setError(500, 'Failed all courses'));
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("subjects students");
    if (!course) return next(setError(404, 'Course not found'))
    return res.json({
      status: 200,
      message: 'Recovered course by id',
      data: { course }
    });
  } catch (error) {
    return next(setError(500, 'Failed course by id'))
  }
}

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const course = await Course.find({ name: name });
    if (!course) return next(setError(404, 'Course not found'));
    return res.json({
      status: 200,
      message: 'Recovered course by name',
      data: { course }
    });
  } catch (error) {
    return next(setError(500, 'Failed course by name'))
  }
}

const create = async (req, res, next) => {
  try {
    const CourseToSave = new Course(req.body)
    const courseInDb = await CourseToSave.save()
    return res.json({
      status: 201,
      message: 'Created new course',
      data: { courseInDb }
    });
  } catch (error) {
    return next(setError(500, 'Failed created course'))
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = new Course(req.body);
    course._id = id;
    const updateCourse = await Course.findByIdAndUpdate(id, course);
    if (!course) return next(setError(404, 'Course not found'))
    return res.json({
      status: 200,
      message: 'Updated course by id',
      data: { updateCourse }
    });
  } catch (error) {
    return next(setError(500, 'Failed course Update by id'))
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const courseRemoved = await Course.findByIdAndDelete(id);
    if (!courseRemoved) return next(setError(404, 'Course not found'));
    return res.json({
      status: 200,
      message: 'Removed course by id',
      data: { courseRemoved }
    });
  } catch (error) {
    return next(setError(500, 'Failed course Remove by id'))
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
}