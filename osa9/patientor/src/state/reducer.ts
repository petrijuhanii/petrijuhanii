import { State } from "./state";
import { Entry, Patient } from "../types";
import { Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry; id: string };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnosis
          }
        };
    case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: {
              ...state.patients[action.payload.id],
              entries: [
                ...(state.patients[action.payload.id].entries || []),
                action.payload.entry,
              ],
            }
          }
        };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]) => ({
  type: "SET_PATIENT_LIST" as const,
  payload: patientListFromApi,
});

export const updatePatientSsn = (patientApi: Patient) => ({
  type: "UPDATE_PATIENT" as const,
  payload: patientApi,
});

export const addPatient = (newPatient: Patient) => ({
  type: "ADD_PATIENT" as const,
  payload: newPatient,
});

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]) => ({
  type: "SET_DIAGNOSIS_LIST" as const,
  payload: diagnosisListFromApi,
});

export const addEntry = (id: string, entry: Entry) => ({
  type: "ADD_ENTRY" as const,
  payload: {id, entry}
});