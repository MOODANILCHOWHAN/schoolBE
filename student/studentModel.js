import mongoose from 'mongoose';

const student = new mongoose.Schema({
  // Basic Information
  name: {
    first: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    middle: { type: String, trim: true },
    last: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  bloodGroup: {
    type: String,
    match: /^[ABO][+-]$/, // Example: A+, O-, B+, AB-
  },

  // Contact Information
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: {
      type: String,
      match: [/^\d{5,6}$/, 'Postal code must be 5 or 6 digits'],
    },
    country: { type: String, trim: true },
  },

  // Academic Information
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    uppercase: true,
  },
  admissionDate: { type: Date, default: Date.now },
  class: { type: String, required: [true, 'Class is required'] },
  section: { type: String },
  courses: [
    {
      courseCode: { type: String, required: true },
      courseName: { type: String, required: true },
      grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F', 'Incomplete'] },
    },
  ],

  // Guardian/Parent Information
  guardian: {
    name: { type: String, required: [true, 'Guardian name is required'] },
    relation: { type: String, required: [true, 'Relation is required'] },
    phone: {
      type: String,
      required: [true, 'Guardian phone is required'],
      match: [/^\d{10}$/, 'Guardian phone must be 10 digits'],
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid guardian email'],
    },
  },

  // Attendance & Performance
  // attendance: [
  //   {
  //     date: { type: Date, required: true },
  //     status: {
  //       type: String,
  //       enum: ['Present', 'Absent', 'Late'],
  //       required: true,
  //     },
  //   },
  // ],
  performance: [
    {
      subject: { type: String, required: true },
      marksObtained: { type: Number, min: 0 },
      totalMarks: { type: Number, min: 1 },
      examDate: { type: Date },
    },
  ],

  // System Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to auto-update timestamps
studentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
