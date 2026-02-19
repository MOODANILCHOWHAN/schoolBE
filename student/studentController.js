import student from './StudentModel.js';

const StudentController = {
  addingStudent: async (req, res) => {
    const request = req.body;
    if (!request) {
      return res.status(404).json({ message: 'something went wrong' });
    }
    student.save();
    return res.status(200).json('Saved sucessfully');
  },
  getStudent: async (req, res) => {
    const {rollNo} =req.params;
    const studentFromDb=await student.find({rollNo});
    // const fromDb= await student.aggregate([
    //   {$match:{rollNo}},
    //   {$limit:1},
    // ])
    if(!studentFromDb){
      return res.status(404).json({message:"not found"});
    }
    return res.status(200).json({data:studentFromDb});
  },
  updateStudent:async(req,res)=>{
    const{rollNo,...body}=req.body;
    const response= await updateStudentImple(rollNo,body);
    if(response.status){
      return res.status(200).json(response);
    }
    return res.status(500).json(response);
  }
};

export default StudentController;