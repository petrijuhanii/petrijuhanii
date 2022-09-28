import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, EntryWithoutId, Entry } from '../types';

const getEntries = () => {
  console.log(patientsData);
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

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const entryId = uuid();
  const newEntry = {
    id: entryId,
    ...entry
  };
  patientsData.find(patient => patient.id === id)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients,
  addEntry
};