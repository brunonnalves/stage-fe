import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// sample page routing
const ListPatients = Loadable(lazy(() => import('../views/PatientsList/PatientsList')));
const PatientDetails = Loadable(lazy(() => import('../views/PatientDetails/PatientDetails')));
const PatientFollowUps = Loadable(lazy(() => import('../views/PatientFollowUps/PatientFollowUps')));
const PatientMedicalPrescriptions = Loadable(
  lazy(() => import('../views/PatientMedicalPrescriptions/PatientMedicalPrescriptions'))
);
const PatientExams = Loadable(lazy(() => import('../views/PatientExams/PatientExams')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // PATIENT URL
    {
      path: '/',
      element: <ListPatients />,
    },
    {
      path: '/patients',
      element: <ListPatients />,
    },
    {
      path: '/patient-details',
      element: <PatientDetails />,
    },
    {
      path: '/patient-details/:id',
      element: <PatientDetails />,
    },
    {
      path: '/patient/add-follow-up/:id',
      element: <PatientFollowUps />,
    },
    {
      path: '/patient/add-medical-prescription/:id',
      element: <PatientMedicalPrescriptions />,
    },
    {
      path: '/patient/add-examinations/:id',
      element: <PatientExams />,
    },
  ],
};

export default MainRoutes;
