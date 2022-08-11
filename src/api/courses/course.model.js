const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }],
  students: [{ type: Schema.Types.ObjectId, ref: "students" }],
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('courses', schema);