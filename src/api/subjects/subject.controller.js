const Subject = require('./subject.model');
const { setError } = require('../../helpers/utils');

const getAll = async (req, res, next) => {
  try {
    const subject = await Subject.find().populate("courses");
    return res.json({
      status: 200,
      message: 'Recovered all subjects',
      data: { subject }
    });
  } catch (error) {
    return next(setError(500, 'Failed all subjects'));
  }
}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const subject = await Subject.findById(id).populate("courses");
    if (!subject) return next(setError(404, 'subject not found'))
    return res.json({
      status: 200,
      message: 'Recovered subject by id',
      data: { subject }
    });
  } catch (error) {
    return next(setError(500, 'Failed subject by id'))
  }
}

const create = async (req, res, next) => {
  try {
    const SubjectToSave = new Subject(req.body)
    const subjectInDb = await SubjectToSave.save()
    return res.json({
      status: 201,
      message: 'Created new subject',
      data: { subjectInDb }
    });
  } catch (error) {
    return next(setError(500, 'Failed created subject'))
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subject = new Subject(req.body);
    subject._id = id;
    const updateSubject = await Subject.findByIdAndUpdate(id, subject);
    if (!subject) return next(setError(404, 'Subject not found'))
    return res.json({
      status: 200,
      message: 'Updated subject by id',
      data: { updateSubject }
    });
  } catch (error) {
    return next(setError(500, 'Failed subject Update by id'))
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subjectRemoved = await Subject.findByIdAndDelete(id);
    if (!subjectRemoved) return next(setError(404, 'Subject not found'));
    return res.json({
      status: 200,
      message: 'Removed subject by id',
      data: { subjectRemoved }
    });
  } catch (error) {
    return next(setError(500, 'Failed subject Remove by id'))
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update
}