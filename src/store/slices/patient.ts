// third-party
import { StateCreator } from 'zustand';

// types
import { IPatient } from '../../types/patient';

// initial state
const initialState: IPatient = {
  id: undefined,
  name: '',
  birthDate: '',
  address: {
    id: undefined,
    postalCode: '',
    street: '',
    number: '',
    complement: '',
  },
  medicalRecords: [],
};

// ==============================|| SLICE - PATIENT ||============================== //

export interface PatientSlice {
  patient: IPatient;
  setViewPatient: (selectedPatient: IPatient) => void;
}

const patient: StateCreator<PatientSlice, [], [], PatientSlice> = (set) => ({
  patient: initialState,
  setViewPatient: (selectedPatient: IPatient) =>
    set(() => ({
      patient: { ...selectedPatient },
    })),
});

export default patient;
