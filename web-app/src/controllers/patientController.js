import mongoose from 'mongoose';
import { PatientSchema } from '../models/patientModel';

const Patient  = mongoose.model('Patient', PatientSchema)

export const addNewPatient = (req,res) => {
    let newPatient  = new Patient(req.body);
    newPatient.save((err, patient)=> {
        if(err) {
            res.send(err);
        }

        res.json(patient);
    });
}
export const getPatients = (req,res) => {
    Patient.find((err, patient)=> {
        if(err) {
            res.send(err);
        }

        res.json(patient);
    });
}
export const getPatientById = (req,res) => {
    Patient.findById(req.params.address,(err, patient)=> {
        if(err) {
            res.send(err);
        }

        res.json(patient);
    });
}

export const deletePatientById = (req,res) => {
    Patient.remove(req.params.address,(err, patient)=> {
        if(err) {
            res.send(err);
        }

        res.json(patient);
    });
}