import { patientFromApi } from "../state";
import { addEntry, updatePatientSsn } from "../state/reducer";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import axios from "axios";
import { Entry } from "../types";
import { AddEntryModal } from "../AddPatientModal";
import { Button } from "@material-ui/core";
import React from "react";
import { EntryWithoutId } from "../AddPatientModal/AddEntryForm";
import { apiBaseUrl } from "../constants";


const PatientPage = () => {
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const updatePatient = async (id: string) => {
    try {
      const patientApi = await patientFromApi(id);
      dispatch(updatePatientSsn(patientApi));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  const submitNewEntry = async ( values: EntryWithoutId) => {
    if(values.type==="HealthCheck"){
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id as string}/entries`,
          {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: "HealthCheck",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            healthCheckRating: values.healthCheckRating
          }
        );
        dispatch(addEntry( id as string, newEntry ));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
    if(values.type==="Hospital"){
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id as string}/entries`,
          {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: values.type,
            discharge: {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria
            }
          }
        );
        dispatch(addEntry( id as string, newEntry ));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
    
    if(values.type==="OccupationalHealthcare"){
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id as string}/entries`,
          {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            diagnosisCodes: values.diagnosisCodes,
            type: "OccupationalHealthcare",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            employerName: values.employerName,
            sickLeave: {
              startDate: values.sickLeaveStartDate,
              endDate: values.sickLeaveEndDate
            }
          }
        );
        dispatch(addEntry( id as string, newEntry ));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    }
  };

  const patient = Object.values(patients).find(patient => patient.id === id);

  if (!patient?.ssn){
    updatePatient(patient?.id as string).catch(e => console.error(e));
  }
  return (
    <div className="App">
      <h2>{patient?.name}, {patient?.gender==="male" ? "male" : "female"}</h2>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <p>
        <b>entries</b>
      </p>
      <div>
        {patient?.entries?.map((entry: Entry)=>(
          <div key={entry.id}>
            <div>{entry.date} {entry.type}</div>
            <i>{entry.description}</i>
            <div>diagnose by {entry.specialist}</div>
            <ul>
              {entry.diagnosisCodes?.map((code: string) => {
                const diagnose = Object.values(diagnosis).find(d => d.code === code);
                return ( <li key={code}>{code} {diagnose?.name}</li> );
              })}
            </ul>
          </div>
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button> 
    </div>
  );
};

export default PatientPage;
