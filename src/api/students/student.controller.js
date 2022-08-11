const Student = require('./student.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
  try {
    const student = await Student.find().populate("courses");
    return res.json({
      status: 200,
      message: 'Recovered all students',
      data: { student }
    });
  } catch (error) {
    return next(setError(500, 'Failed all students'));
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const student = await Student.findById(id).populate("courses");
    if (!student) return next(setError(404, 'Student not found'))
    return res.json({
      status: 200,
      message: 'Recovered student by id',
      data: { student }
    });
  } catch (error) {
    return next(setError(500, 'Failed student by id'))
  }
}

const create = async (req, res, next) => {
  try {
    const StudentToSave = new Student(req.body)
    const studentInDb = await StudentToSave.save()
    return res.json({
      status: 201,
      message: 'Created new student',
      data: { studentInDb }
    });
  } catch (error) {
    return next(setError(500, 'Failed created student'))
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = new Student(req.body);
    student._id = id;
    const updateStudent = await Student.findByIdAndUpdate(id, student);
    if (!student) return next(setError(404, 'Student not found'))
    return res.json({
      status: 200,
      message: 'Updated student by id',
      data: { updateStudent }
    });
  } catch (error) {
    return next(setError(500, 'Failed student Update by id'))
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentRemoved = await Student.findByIdAndDelete(id);
    if (!studentRemoved) return next(setError(404, 'Student not found'));
    return res.json({
      status: 200,
      message: 'Removed student by id',
      data: { studentRemoved }
    });
  } catch (error) {
    return next(setError(500, 'Failed student Remove by id'))
  }
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}