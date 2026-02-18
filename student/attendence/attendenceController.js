import attendenceModel from './attendenceModel.js';
import Student from '../studentModel.js'
import {Router} from 'express'
const router=Router();
router.get('/attendence', async (req,res)=>{
    const {rollNo,month,date,status}= req.query;
    const student=await Student.findOne({rollNo});
    if(!student){
        return res.status(404).json({message:"student not found"});
    }

    /**
     * this is the traditional way to add the data and then populate it from multi-schema
     */

    const attendance = await attendenceModel({
        student:student._id,month,date,status
    })
    await attendance.save();

    // //populate the student details in response
    // const savedAttendance = await attendenceModel.findById(attendance._id)
    // .populate('student','name class rollNo');

    // res.status(201).json({message:'saved sucessfully',data:savedAttendance});


    /**
     * here by using agregate
     */

    const result = await attendenceModel.aggregate([
        {$match :{month:month}}, //filtering the data by month
        {
            $lookup :{
                from:"Student",
                localField:"student",
                foreignField:"rollNo",
                as:"studentDetails"
            }
        },
        {$unwind:"$studentDetails"},   //=> faltten the joined array
        {
            $project:{
                month:1,date:1,status:1,"studentDetails.name":1,"studentDetails.class":1,
                                "studentDetails.rollNo":1
            }
        }
    ])

    return res.status(201).json({message:'attendence saved',data:result})
}
)
