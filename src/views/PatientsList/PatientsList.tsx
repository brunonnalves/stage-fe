// react
import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TablePagination,
  useTheme,
} from '@mui/material';

// third-party
import {
  IconArchive,
  IconDots,
  IconFileSearch,
  IconSearch,
  IconEdit,
  IconCirclePlus,
  IconUserCheck,
  IconReportMedical,
  IconStethoscope,
  IconPill,
  IconAmbulance,
} from '@tabler/icons-react';
import Swal from 'sweetalert2';

// project imports
import DefaultButton from '../../ui-component/custom/DefaultButton';
import MainCard from '../../ui-component/cards/MainCard';
import { snackbarInitialState } from '../../config/constant';
import { errorSnackbarTrigger } from '../../utils/helpers/snackbarHelpers';
import { applyPhoneMask } from '../../utils/forms/masks';
import { patientService } from '../../utils/services';

// styles
import { ListHeader, ListRow, ListWrapper, StatusContainer } from './styles';

// types
import { IPatient } from '../../types/patient';
import { useStore } from '../../store';

// ============================|| PATIENT LIST PAGE - ROUTE ( /patients ) ||============================ //

const PatientsList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [indexOpen, setIndexOpen] = useState(-1);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilterSelected, setStatusFilterSelected] = useState<string[]>(['IN_PROGRESS']);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(100);
  const { drawerRightOpen, selectedItemDrawerRight } = useStore((state) => state.drawerRight);
  const openSnackbar = useStore((state) => state.openSnackbar);
  const closeRightDrawer = useStore((state) => state.closeRightDrawer);
  const openRightDrawer = useStore((state) => state.openRightDrawer);
  const setSelectedItemDrawerRight = useStore((state) => state.setSelectedItemDrawerRight);
  const setViewPatient = useStore((state) => state.setViewPatient);

  const statusFilterOptions = [
    {
      status: 'IN_PROGRESS',
      uiRender: 'Internado',
    },
    {
      status: 'FINISHED',
      uiRender: 'Alta',
    },
  ];

  useEffect(() => {
    handleFilterPatients(statusFilterSelected);
  }, []);

  const handleSearchPatients = async (search: string) => {
    try {
      const response = await patientService.searchPatients(search, statusFilterSelected);
      setPatients(response.patients);
      setCount(response.patients.length);
      setPage(0);
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const handleSearch = async (search: string) => {
    const newString = search;
    handleSearchPatients(newString ?? '');
  };

  const handleFilterPatients = async (filter: string[]) => {
    try {
      const response = await patientService.searchPatients(search, filter);
      setPatients(response.patients);
      setCount(response.patients.length);
      setPage(0);
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<typeof statusFilterSelected>) => {
    const {
      target: { value },
    } = event;
    const ValueArray = value as string[];
    setStatusFilterSelected(ValueArray);
    handleFilterPatients(ValueArray);
  };

  const handleOpenMenu = (e: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(e.currentTarget);
    setIndexOpen(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIndexOpen(-1);
  };

  const selectEditPatient = (id: string) => {
    navigate(`/patient-details/${id}`);
  };

  const selectHospitalization = async (patientId: string) => {
    try {
      const response = await patientService.hospitalization(patientId);
      navigate(`/patient/add-follow-up/${response.medicalRecord.id}`);
    } catch (error) {}
  };

  const selectAddFollowUp = (id: string) => {
    navigate(`/patient/add-follow-up/${id}`);
  };

  const selectAddMedicalPrescription = (id: string) => {
    navigate(`/patient/add-medical-prescription/${id}`);
  };

  const selectAddExaminations = (id: string) => {
    navigate(`/patient/add-examinations/${id}`);
  };

  const getPatientDetails = async (id: string) => {
    try {
      const response = await patientService.get(id);
      return response;
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const selectViewPatient = (patient: IPatient) => {
    handleCloseMenu();
    drawerRightOpen &&
    selectedItemDrawerRight === 'viewPatient' &&
    patient.id === 'id do paciente aqui'
      ? closeRightDrawer()
      : openRightDrawer();
    setViewPatient(patient);
    setSelectedItemDrawerRight('viewPatient');
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MainCard>
      <ListWrapper>
        <span>
          <FormControl>
            <OutlinedInput
              placeholder="Buscar"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                e.key === 'Enter' ? handleSearch(search) : null
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="button" edge="end" onClick={() => handleSearch(search)}>
                    <IconSearch size={24} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ width: '15%' }}>
            <InputLabel>Status</InputLabel>
            <Select
              multiple
              value={statusFilterSelected}
              onChange={handleFilterChange}
              input={<OutlinedInput label="Status" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((status) => (
                    <Chip
                      key={status}
                      label={statusFilterOptions.find((e) => e.status === status)?.uiRender}
                    />
                  ))}
                </Box>
              )}
            >
              {statusFilterOptions.map((option) => (
                <MenuItem key={option.status} value={option.status}>
                  <Checkbox
                    color="success"
                    checked={statusFilterSelected.indexOf(option.status) > -1}
                  />
                  <ListItemText primary={option.uiRender} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DefaultButton
            onClick={() => {
              closeRightDrawer();
              navigate('/patient-details');
            }}
            startIcon={<IconCirclePlus size={20} />}
            title="Adicionar Paciente"
            sx={{ marginLeft: 'auto' }}
          />
        </span>
        <ListHeader theme={theme.palette.mode}>
          <span>Nome</span>
          <span>Status</span>
          <span>Data de nascimento</span>
          <span>Ações</span>
        </ListHeader>
        {patients.map(
          (patient: IPatient, index) =>
            index >= page * rowsPerPage &&
            index < (1 + page) * rowsPerPage && (
              <ListRow
                key={index}
                color={(index % 2 == 0 && '#DEDEED') || (index % 2 == 1 && '#B9B9CF') || undefined}
              >
                <span>{patient.name}</span>
                <span>
                  <StatusContainer
                    status={
                      patient.medicalRecords
                        ? patient.medicalRecords[patient.medicalRecords?.length - 1].status ?? ''
                        : ''
                    }
                  >
                    {patient.medicalRecords &&
                    patient.medicalRecords.at(-1) &&
                    patient.medicalRecords.at(-1)?.status === 'IN_PROGRESS'
                      ? 'Internado'
                      : 'Alta'}
                  </StatusContainer>
                </span>
                <span>{patient.birthDate}</span>
                <span>
                  <IconButton onClick={(e) => handleOpenMenu(e, index)}>
                    <IconDots size={28} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={indexOpen === index}
                    onClose={handleCloseMenu}
                    keepMounted
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => selectViewPatient(patient)} sx={{ gap: 2 }}>
                      <IconFileSearch /> Visualizar
                    </MenuItem>
                    <MenuItem onClick={() => selectEditPatient(patient.id ?? '')} sx={{ gap: 2 }}>
                      <IconEdit /> Editar informações do paciente
                    </MenuItem>
                    {patient.medicalRecords &&
                      patient.medicalRecords.at(-1) &&
                      patient.medicalRecords.at(-1)?.status === 'FINISHED' && (
                        <MenuItem
                          onClick={() => selectHospitalization(patient.id ?? '')}
                          sx={{ gap: 2 }}
                        >
                          <IconAmbulance /> Internar paciente
                        </MenuItem>
                      )}
                    {patient.medicalRecords &&
                      patient.medicalRecords.at(-1) &&
                      patient.medicalRecords.at(-1)?.status === 'IN_PROGRESS' && (
                        <>
                          <MenuItem
                            onClick={() =>
                              selectAddFollowUp(
                                patient.medicalRecords && patient.medicalRecords.length > 0
                                  ? patient.medicalRecords.at(-1)?.id ?? ''
                                  : ''
                              )
                            }
                            sx={{ gap: 2 }}
                          >
                            <IconReportMedical /> Adicionar evolução do paciente
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              selectAddMedicalPrescription(
                                patient.medicalRecords && patient.medicalRecords.length > 0
                                  ? patient.medicalRecords.at(-1)?.id ?? ''
                                  : ''
                              )
                            }
                            sx={{ gap: 2 }}
                          >
                            <IconPill /> Adicionar prescrição médica
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              selectAddExaminations(
                                patient.medicalRecords && patient.medicalRecords.length > 0
                                  ? patient.medicalRecords.at(-1)?.id ?? ''
                                  : ''
                              )
                            }
                            sx={{ gap: 2 }}
                          >
                            <IconStethoscope /> Solicitar exame
                          </MenuItem>
                        </>
                      )}
                  </Menu>
                </span>
              </ListRow>
            )
        )}
      </ListWrapper>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default PatientsList;
