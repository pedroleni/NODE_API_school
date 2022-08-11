const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, unique: true, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }],
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('teachers', schema);