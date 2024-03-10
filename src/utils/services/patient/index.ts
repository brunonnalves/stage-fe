import api from '../axios';
import { PatientViewModel } from '../view-models/patient-view-models';
import { IPatient, IPatientResponse, IPatientsResponse } from '../../../types/patient';

export const newPatient = async (body: IPatient): Promise<IPatient> => {
  const { data } = await api.post<IPatient>('/patients', PatientViewModel.toHTTP(body));

  return data;
};

export const get = async (id: string): Promise<IPatient> => {
  const { data } = await api.get<IPatientResponse>(`/patients/${id}`);

  return PatientViewModel.toDomain(data.patient);
};

export const update = async (id: string, body: IPatient): Promise<IPatient> => {
  const { data } = await api.put<IPatient>(`/patients/${id}`, PatientViewModel.toHTTP(body));

  return data;
};

export const searchPatients = async (
  name: string,
  status: string[]
): Promise<IPatientsResponse> => {
  const { data } = await api.get<IPatientsResponse>('/patients', {
    params: {
      name: name !== '' ? name : undefined,
      status: status,
    },
  });

  return data;
};

export const hospitalization = async (patientId: string) => {
  const { data } = await api.post(`/medical-records/${patientId}`);

  return data;
};

export const addFollowUp = async (body: any) => {
  const { data } = await api.post('/medical-records/follow-ups', body);

  return data;
};

export const addMedicalPrescription = async (body: any) => {
  const { data } = await api.post('/medical-records/medical-prescriptions', body);

  return data;
};

export const addExamination = async (body: any) => {
  const { data } = await api.post('/medical-records/examinations', body);

  return data;
};

export const discharge = async (id: string) => {
  const { data } = await api.put(`/medical-records/${id}`);

  return data;
};
