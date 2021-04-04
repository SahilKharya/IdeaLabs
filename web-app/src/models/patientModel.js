import mongoose from 'mongoose';

const Schema = mongoose.Schema;


export const PatientSchema = new Schema({
    Name: {
        type: String,
        trim: true,  
        required: true
    },
    address: {
        type: String,
        required: true
    },
    medicalReport: {
        type: String
    }
});