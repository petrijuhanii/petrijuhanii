import diagnosesData from '../../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getEntries,
  addDiagnoses
};