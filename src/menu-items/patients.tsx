// assets
import { IconUsers } from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const patients = {
  id: 'dashboard',
  title: 'Pacientes',
  type: 'group',
  children: [
    {
      id: 'patients',
      title: 'Pacientes',
      type: 'item',
      url: '/patients',
      icon: icons.IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default patients;
