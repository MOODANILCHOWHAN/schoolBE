import student from './StudentModel.js';
exports.updateStudentImple=async (rollNo,data)=>{
    const updatedData= await student.findOneAndUpdate(
        {rollNo},
        {$set:data},
        {new:true,runValidation:true}
    )

    if(updatedData){
        return {status:true,data:updatedData,message:'updated sucessfully',};
    }
    return {message:'something went wrong.',status:false}
}