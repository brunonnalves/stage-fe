export interface IPatientsResponse {
  count: number;
  patients: IPatient[];
}

export interface IPatientResponse {
  patient: IPatient;
}

export class IPatient {
  id?: string;
  name?: string;
  birthDate?: string;
  address?: IAddress;
  medicalRecords?: IMedicalRecord[];
}

export interface IAddress {
  id?: string;
  postalCode?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IMedicalRecord {
  id?: string;
  status?: 'IN_PROGRESS' | 'FINISHED' | string;
  medicalPrescription?: IMedicalPrescription[];
  followUp?: IFollowUp[];
  examinations?: IExamination[];
}

export interface IMedicalPrescription {
  id?: string;
  medicine?: string;
  dose?: string;
  startDate?: string;
  endDate?: string;
}

export interface IFollowUp {
  id?: string;
  date?: string;
  comment?: string;
}

export interface IExamination {
  id?: string;
  name?: string;
  requestDate?: string;
  resultDate?: string;
  result?: string;
  clinicalReport?: string;
}
