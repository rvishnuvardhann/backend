// backend/models/studyLeaveModel.js
import mongoose from 'mongoose';

const studyLeaveSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
    unique: true,
  },
  fid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

const StudyLeaveModel = mongoose.model('StudyLeave', studyLeaveSchema);

export default StudyLeaveModel;
