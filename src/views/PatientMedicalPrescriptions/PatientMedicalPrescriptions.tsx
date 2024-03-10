// react
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { FormControl, OutlinedInput, Typography, FormHelperText, Box } from '@mui/material';

// third-party
import { IconPill } from '@tabler/icons-react';
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

const PatientMedicalPrescriptions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const openSnackbar = useStore((state) => state.openSnackbar);

  let initialFormValues = {
    medicalRecordId: params.id,
    medicine: '',
    dose: '',
    startDate: new Date(Date.now()).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  };

  const formikProps = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      medicine: Yup.string().required('Medicamento é obrigatória'),
      dose: Yup.string().required('Dosagem é obrigatória'),
      startDate: Yup.string().required('Data é obrigatória'),
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
      const response = await patientService.addMedicalPrescription([values]);
      successSnackbarTrigger(openSnackbar, 'Prescrição médica adicionada com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  return (
    <MainCard>
      <FormWrapper noValidate onSubmit={formikProps.handleSubmit}>
        <Box display="flex" alignItems="center">
          <IconPill size="24px" />
          <Typography marginLeft={2}>Prescrição médica</Typography>
        </Box>
        <PatientFormRow gridTemplateColumns="1fr 1fr 1fr">
          <FormControl
            fullWidth
            error={Boolean(formikProps.touched.medicine && formikProps.errors.medicine)}
          >
            <LabelCel>
              Medicamento <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="medicine"
              name="medicine"
              onChange={formikProps.handleChange}
              value={formikProps.values.medicine}
            />
            {formikProps.touched.medicine && formikProps.errors.medicine && (
              <FormHelperText error>{formikProps.errors.medicine}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(formikProps.touched.dose && formikProps.errors.dose)}
          >
            <LabelCel>
              Dose <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="dose"
              name="dose"
              onChange={formikProps.handleChange}
              value={formikProps.values.dose}
            />
            {formikProps.touched.dose && formikProps.errors.dose && (
              <FormHelperText error>{formikProps.errors.dose}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(formikProps.touched.startDate && formikProps.errors.startDate)}
          >
            <LabelCel>
              Data <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="startDate"
              name="startDate"
              onChange={formikProps.handleChange}
              value={formikProps.values.startDate}
              inputComponent={DateMask as any}
              placeholder="dd/mm/yyyy"
            />
            {formikProps.touched.startDate && formikProps.errors.startDate && (
              <FormHelperText error>{formikProps.errors.startDate}</FormHelperText>
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

export default PatientMedicalPrescriptions;
