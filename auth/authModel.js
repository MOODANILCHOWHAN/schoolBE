import mongoose from 'mongoose';
const auth = new mongoose.Schema({
  rollNo: { type: String, required: true },
  password: { type: String, required: true },
});
const authentication = mongoose.model('auth', auth);
export default authentication;
