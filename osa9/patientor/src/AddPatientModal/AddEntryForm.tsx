import React, { useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, GenderOption, DiagnosisSelection, SelectField, TypeOption, RatingOption } from "./FormField";
import { Entry, Gender, HealthCheckRating, Type } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id,
 * because those are irrelevant for new entry object.
 */
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" },
];

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.HealthCheck, label: "HealthCheck" },
  { value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

const ratingOptions: RatingOption[] = [
    { value: HealthCheckRating["Healthy"], label: 0 },
    { value: HealthCheckRating["LowRisk"], label: 1 },
    { value: HealthCheckRating["HighRisk"], label: 2 },
    { value: HealthCheckRating["CriticalRisk"], label: 3 },
  ];
  

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: Type.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
        healthCheckRating: HealthCheckRating["Healthy"]
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        if(values.type==="Hospital"){
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
          return errors;
        }
        if(values.type==="HealthCheck"){
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          return errors;
        }
        if(values.type==="OccupationalHealthcare"){
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          }
          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          }
          return errors;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => { 
        useEffect(()=>{
            values.date="";
            values.description="",
            values.diagnosisCodes=[];
            values.specialist="";
            values.dischargeDate="";
            values.dischargeCriteria="";
            values.employerName="";
            values.sickLeaveStartDate="";
            values.sickLeaveEndDate="";
            values.healthCheckRating=HealthCheckRating["Healthy"];
        }, [values.type]);
        console.log(values);
        if(values.type==='Hospital'){
            return (
            <Form className="form ui">
                <SelectField label="Type" name="type" options={{
                    gender: genderOptions, type: typeOptions, healthCheckRating: ratingOptions}} />
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Discharged Date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
                />
                <Field
                label="Discharged Criteria"
                placeholder="Criteria"
                name="dischargeCriteria"
                component={TextField}
                />
                <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
                />
                
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
        }
        if(values.type==='OccupationalHealthcare'){
            return (
            <Form className="form ui">
                <SelectField label="Type" name="type" options={{
                    gender: genderOptions, type: typeOptions, healthCheckRating: ratingOptions}} />
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}
                />
                <Field
                label="Sick leave start date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveStartDate"
                component={TextField}
                />
                <Field
                label="Sick leave end date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveEndDate"
                component={TextField}
                />
                <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
                />
                
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
        }
        return (
            <Form className="form ui">
                <SelectField label="Type" name="type" options={{
                    gender: genderOptions, type: typeOptions, healthCheckRating: ratingOptions}} />
                <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                />
                <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
                />
                <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                />
                <SelectField label="Rating" name="healthCheckRating" options={{
                    gender: genderOptions, type: typeOptions, healthCheckRating: ratingOptions}} />
                <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
                />
                <Grid>
                <Grid item>
                    <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    style={{
                        float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid>
                </Grid>
            </Form>
            );
      }}
    </Formik>
  );
};

export default AddEntryForm;
