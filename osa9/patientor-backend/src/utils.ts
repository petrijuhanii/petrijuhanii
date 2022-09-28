import { Gender, NewPatientEntry, DiagnoseEntry, EntryWithoutId, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isHealthRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};  
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};  
const parseHealthRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthRating(healthCheckRating)) {
    throw new Error('Incorrect or missing gender: ' + healthCheckRating);
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewDiagnosisEntry = (object: any): DiagnoseEntry => {
  const newEntry: DiagnoseEntry = {
    code: parseName(object.code),
    name: parseName(object.name),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    latin: object.latin
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId => {
  if(object.type === "Hospital"){
    const newEntry: EntryWithoutId = {
      description: parseName(object.description),
      date: parseDate(object.date),
      specialist: parseName(object.specialist),
      type: "Hospital",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      diagnosisCodes: object.diagnosisCodes,
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseCriteria(object.discharge.criteria)
      }
    };
    return newEntry;
  }
  if(object.type === "OccupationalHealthcare"){
    const newEntry: EntryWithoutId = {
      description: parseName(object.description),
      date: parseDate(object.date),
      specialist: parseName(object.specialist),
      type: "OccupationalHealthcare",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      diagnosisCodes: object.diagnosisCodes,
      employerName: parseName(object.employerName),
      sickLeave: {
        startDate: parseDate(object.sickLeave.startDate),
        endDate: parseDate(object.sickLeave.endDate)
      }
    };
    return newEntry;
  }
  if(object.type === "HealthCheck"){
    const newEntry: EntryWithoutId = {
      description: parseName(object.description),
      date: parseDate(object.date),
      specialist: parseName(object.specialist),
      type: "HealthCheck",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      diagnosisCodes: object.diagnosisCodes,
      healthCheckRating: parseHealthRating(object.healthCheckRating)
    };
    return newEntry;
  }
  throw new Error('Incorrect or missing type: ' + object.type);
};