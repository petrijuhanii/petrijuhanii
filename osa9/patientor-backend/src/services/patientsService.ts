import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = () => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) =>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients
};