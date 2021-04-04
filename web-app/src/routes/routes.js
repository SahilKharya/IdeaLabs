import { addNewPatient, getPatients, getPatientById } from '../controllers/patientController'

const routes = (app) => {
    app.route('/patient')
        .get((req, res, next) => { 
            console.log(`request from ${req.originalUrl}`)
            console.log(`request type ${req.method}`)
            next();
        }, getPatients)
        .post(addNewPatient);
    
    app.route('/patient/:address')
        .get(getPatientById)
        .put((req, res)=>
        res.send("Put"));
}

export default routes;