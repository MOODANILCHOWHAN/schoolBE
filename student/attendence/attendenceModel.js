import mongoose from 'mongoose';

const attendence = mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    month:{type:String,required:true},
    date:{type:Date,required:true},
    status:{type:String,enum:['Prasent','Absent'], required:true}
});

export default attendenceModel= mongoose.model('attendence',attendence);
