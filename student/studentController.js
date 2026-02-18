import student from './StudentModel.js';

const StudentController = async (req, res) => {
  const request = req.body;
  if (!request) {
    return res.status(404).json({ message: 'something went wrong' });
  }
  student.save();
  return res.status(200).json('Saved sucessfully');
};

export default StudentController;