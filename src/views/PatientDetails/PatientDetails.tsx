// react
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import {
  Accordion,
  FormControl,
  OutlinedInput,
  Typography,
  MenuItem,
  Select,
  Snackbar,
  IconButton,
  Alert,
  FormHelperText,
  AccordionDetails,
  styled,
  AccordionSummary,
  useTheme,
} from '@mui/material';

// third-party
import {
  IconChevronDown,
  IconClipboardData,
  IconUserPlus,
  IconUser,
  IconCircleX,
} from '@tabler/icons-react';
import { getIn, useFormik } from 'formik';
import * as Yup from 'yup';
import { setNestedObjectValues } from 'formik';
import Swal from 'sweetalert2';

// project imports
import DefaultButton from '../../ui-component/custom/DefaultButton';
import MainCard from '../../ui-component/cards/MainCard';
import { errorSnackbarTrigger, successSnackbarTrigger } from '../../utils/helpers/snackbarHelpers';
import { DateMask } from '../../utils/forms/masks';
import { isDateValid } from '../../utils/forms/validation';
import { patientService } from '../../utils/services';

// styles
import { FormWrapper, PatientFormRow, LabelCel, ButtonsWrapper } from './styles';

// types
import { IPatient } from '../../types/patient';
import { useStore } from '../../store';

// ============================|| PATIENT DETAILS PAGE - ROUTE ( /patient-details/:id ) ||============================ //

const PatientDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const openSnackbar = useStore((state) => state.openSnackbar);

  let initialFormValues: IPatient = {
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
  };

  const formikProps = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Nome é obrigatório'),
      birthDate: Yup.string()
        .test('test-invalid-birthDate', 'Data de nascimento inválida', (date) =>
          isDateValid(date ?? '')
        )
        .required('Data de nascimento é obrigatória'),
      address: Yup.object({
        postalCode: Yup.string().required('CEP é obrigatório'),
        street: Yup.string().required('Rua é obrigatória'),
        number: Yup.string().required('Número é obrigatório'),
        complement: Yup.string().required('Complemento é obrigatório'),
      }),
    }),
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = (values: IPatient) => {
    if (params.id) {
      updatePatient(values);
    } else {
      createPatient(values);
    }
  };

  const createPatient = async (values: IPatient) => {
    try {
      const response = await patientService.newPatient(values);
      successSnackbarTrigger(openSnackbar, 'Paciente criado com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const updatePatient = async (values: IPatient) => {
    try {
      const response = await patientService.update(params.id ?? '', values);
      successSnackbarTrigger(openSnackbar, 'Paciente atualizado com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPatientDetails(params.id);
    }
  }, []);

  const getPatientDetails = async (id: string) => {
    try {
      const response = await patientService.get(id);
      initialFormValues = {
        ...response,
      };
      formikProps.setValues(initialFormValues);
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const onClickConfirmForm = async () => {
    Swal.fire({
      html: `<h2 style={{ lineHeight: '1.5rem' }}>Tem certeza que gostaria de salvar as alterações?</h2>`,
      icon: 'question',
      background: '#fff',
      color: '#212121',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#4f4fab',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const validationErrors = await formikProps.validateForm();
        if (Object.keys(validationErrors).length > 0) {
          formikProps.setTouched(setNestedObjectValues(validationErrors, true));
          return;
        }
        handleSubmitForm(formikProps.values);
      }
    });
  };

  const StyledAccordionSummary = styled(AccordionSummary)(
    ({ theme }) => `
  background-color: #eeeeee;
  `
  );

  return (
    <MainCard>
      <FormWrapper noValidate onSubmit={formikProps.handleSubmit}>
        <Accordion defaultExpanded>
          <StyledAccordionSummary expandIcon={<IconChevronDown />} id="patientAccordion">
            <IconUserPlus size="24px" />
            <Typography marginLeft={2}>Paciente</Typography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <PatientFormRow gridTemplateColumns="1fr 1fr">
              <FormControl
                fullWidth
                error={Boolean(formikProps.touched.name && formikProps.errors.name)}
              >
                <LabelCel>
                  Nome <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="name"
                  name="name"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.name}
                />
                {formikProps.touched.name && formikProps.errors.name && (
                  <FormHelperText error>{formikProps.errors.name}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(formikProps.touched.birthDate && formikProps.errors.birthDate)}
              >
                <LabelCel>
                  Data de nascimento <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="birthDate"
                  name="birthDate"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.birthDate}
                  inputComponent={DateMask as any}
                  placeholder="dd/mm/yyyy"
                />
                {formikProps.touched.birthDate && formikProps.errors.birthDate && (
                  <FormHelperText error>{formikProps.errors.birthDate}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(formikProps.touched, 'address.postalCode') &&
                    getIn(formikProps.errors, 'address.postalCode')
                )}
              >
                <LabelCel>
                  CEP <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="address.postalCode"
                  name="address.postalCode"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.address?.postalCode}
                />
                {getIn(formikProps.touched, 'address.value') &&
                  getIn(formikProps.errors, 'address.value') && (
                    <FormHelperText error>
                      {getIn(formikProps.errors, 'address.postalCode')}
                    </FormHelperText>
                  )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(formikProps.touched, 'address.street') &&
                    getIn(formikProps.errors, 'address.street')
                )}
              >
                <LabelCel>
                  Logradouro <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="address.street"
                  name="address.street"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.address?.street}
                />
                {getIn(formikProps.touched, 'address.street') &&
                  getIn(formikProps.errors, 'address.street') && (
                    <FormHelperText error>
                      {getIn(formikProps.errors, 'address.street')}
                    </FormHelperText>
                  )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(formikProps.touched, 'address.number') &&
                    getIn(formikProps.errors, 'address.number')
                )}
              >
                <LabelCel>
                  Número <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="address.number"
                  name="address.number"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.address?.number}
                />
                {getIn(formikProps.touched, 'address.number') &&
                  getIn(formikProps.errors, 'address.number') && (
                    <FormHelperText error>
                      {getIn(formikProps.errors, 'address.number')}
                    </FormHelperText>
                  )}
              </FormControl>
              <FormControl
                fullWidth
                error={Boolean(
                  getIn(formikProps.touched, 'address.complement') &&
                    getIn(formikProps.errors, 'address.complement')
                )}
              >
                <LabelCel>
                  Complemento <span>*</span>
                </LabelCel>
                <OutlinedInput
                  id="address.complement"
                  name="address.complement"
                  onChange={formikProps.handleChange}
                  value={formikProps.values.address?.complement}
                />
                {getIn(formikProps.touched, 'address.complement') &&
                  getIn(formikProps.errors, 'address.complement') && (
                    <FormHelperText error>
                      {getIn(formikProps.errors, 'address.complement')}
                    </FormHelperText>
                  )}
              </FormControl>
            </PatientFormRow>
          </AccordionDetails>
        </Accordion>

        <ButtonsWrapper>
          <DefaultButton title="Voltar" onClick={() => navigate('/patients')} />
          {params.id ? (
            <>
              <DefaultButton title="Salvar" onClick={onClickConfirmForm} />
            </>
          ) : (
            <DefaultButton title="Criar" type="submit" />
          )}
        </ButtonsWrapper>
      </FormWrapper>
    </MainCard>
  );
};

export default PatientDetails;
