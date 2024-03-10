// react
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { FormControl, OutlinedInput, Typography, FormHelperText, Box } from '@mui/material';

// third-party
import { IconStethoscope } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// project imports
import DefaultButton from '../../ui-component/custom/DefaultButton';
import MainCard from '../../ui-component/cards/MainCard';
import { errorSnackbarTrigger, successSnackbarTrigger } from '../../utils/helpers/snackbarHelpers';
import { DateMask } from '../../utils/forms/masks';
import { patientService } from '../../utils/services';

// styles
import { FormWrapper, PatientFormRow, LabelCel, ButtonsWrapper } from './styles';

// types
import { useStore } from '../../store';

// ============================|| PATIENT FOLLOW UP PAGE - ROUTE ( /patient/add-follow-up/:id ) ||============================ //

const PatientExams = () => {
  const params = useParams();
  const navigate = useNavigate();
  const openSnackbar = useStore((state) => state.openSnackbar);

  let initialFormValues = {
    medicalRecordId: params.id,
    name: '',
    requestDate: new Date(Date.now()).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  };

  const formikProps = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Nome é obrigatória'),
      requestDate: Yup.string().required('Data é obrigatória'),
    }),
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = (values: any) => {
    addMedicalPrescriptions(values);
  };

  const addMedicalPrescriptions = async (values: any) => {
    try {
      const response = await patientService.addExamination([values]);
      successSnackbarTrigger(openSnackbar, 'Exames solicitados com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  return (
    <MainCard>
      <FormWrapper noValidate onSubmit={formikProps.handleSubmit}>
        <Box display="flex" alignItems="center">
          <IconStethoscope size="24px" />
          <Typography marginLeft={2}>Exames</Typography>
        </Box>
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
            error={Boolean(formikProps.touched.requestDate && formikProps.errors.requestDate)}
          >
            <LabelCel>
              Data <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="requestDate"
              name="requestDate"
              onChange={formikProps.handleChange}
              value={formikProps.values.requestDate}
              inputComponent={DateMask as any}
              placeholder="dd/mm/yyyy"
            />
            {formikProps.touched.requestDate && formikProps.errors.requestDate && (
              <FormHelperText error>{formikProps.errors.requestDate}</FormHelperText>
            )}
          </FormControl>
        </PatientFormRow>

        <ButtonsWrapper>
          <DefaultButton title="Voltar" onClick={() => navigate('/patients')} />
          <DefaultButton title="Criar" type="submit" />
        </ButtonsWrapper>
      </FormWrapper>
    </MainCard>
  );
};

export default PatientExams;
