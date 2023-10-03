import express from 'express';
import StudyLeaveModel from './studyLeaveModel.js'

const router = express.Router();

// Create a new study leave application
router.post('/apply', async (req, res) => {
  try {
    const {
      tid,
      fid,
      name,
      designation,
      department,
      startDate,
      endDate,
    } = req.body;

    const studyLeaveApplication = new StudyLeaveModel({
      tid,
      fid,
      name,
      designation,
      department,
      startDate,
      endDate,
    });

    await studyLeaveApplication.save();

    res.status(201).json({ message: 'Study leave application submitted successfully' });
  } catch (error) {
    console.error('Error while submitting study leave application:', error);
    res.status(500).json({ error: 'An error occurred while submitting the application' });
  }
});

// Fetch all study leave applications
router.get('/applications', async (req, res) => {
  try {
    const studyLeaveApplications = await StudyLeaveModel.find();
    res.status(200).json(studyLeaveApplications);
  } catch (error) {
    console.error('Error while fetching study leave applications:', error);
    res.status(500).json({ error: 'An error occurred while fetching applications' });
  }
});

// Update the status of a study leave application (approve or reject)
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedApplication = await StudyLeaveModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Study leave application not found' });
    }

    res.status(200).json({ message: 'Application status updated successfully', updatedApplication });
  } catch (error) {
    console.error('Error while updating study leave application status:', error);
    res.status(500).json({ error: 'An error occurred while updating the status' });
  }
});

export default router;
