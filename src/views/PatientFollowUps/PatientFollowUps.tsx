// react
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { FormControl, OutlinedInput, Typography, FormHelperText, Box } from '@mui/material';

// third-party
import { IconReportMedical } from '@tabler/icons-react';
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

const PatientFollowUps = () => {
  const params = useParams();
  const navigate = useNavigate();
  const openSnackbar = useStore((state) => state.openSnackbar);

  let initialFormValues = {
    medicalRecordId: params.id,
    date: new Date(Date.now()).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    comment: '',
  };

  const formikProps = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      comment: Yup.string().required('Situação do paciente é obrigatória'),
      date: Yup.string().required('Data é obrigatória'),
    }),
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  const handleSubmitForm = (values: any) => {
    addFollowUp(values);
  };

  const addFollowUp = async (values: any) => {
    try {
      const response = await patientService.addFollowUp(values);
      successSnackbarTrigger(openSnackbar, 'Registro diário adicionado com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  const handleDischarge = async (values: any) => {
    try {
      await patientService.discharge(values.medicalRecordId);
      await patientService.addFollowUp(values);
      successSnackbarTrigger(openSnackbar, 'Alta realizada com sucesso');
      navigate('/patients');
    } catch (error: any) {
      errorSnackbarTrigger(openSnackbar, error);
    }
  };

  return (
    <MainCard>
      <FormWrapper noValidate onSubmit={formikProps.handleSubmit}>
        <Box display="flex" alignItems="center">
          <IconReportMedical size="24px" />
          <Typography marginLeft={2}>Acompanhamento</Typography>
        </Box>
        <PatientFormRow gridTemplateColumns="1fr 1fr 1fr 1fr">
          <FormControl
            fullWidth
            error={Boolean(formikProps.touched.date && formikProps.errors.date)}
          >
            <LabelCel>
              Data <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="date"
              name="date"
              onChange={formikProps.handleChange}
              value={formikProps.values.date}
              inputComponent={DateMask as any}
              placeholder="dd/mm/yyyy"
            />
            {formikProps.touched.date && formikProps.errors.date && (
              <FormHelperText error>{formikProps.errors.date}</FormHelperText>
            )}
          </FormControl>
        </PatientFormRow>

        <PatientFormRow gridTemplateColumns="1fr">
          <FormControl
            fullWidth
            error={Boolean(formikProps.touched.comment && formikProps.errors.comment)}
          >
            <LabelCel>
              Situação atual do paciente <span>*</span>
            </LabelCel>
            <OutlinedInput
              id="comment"
              name="comment"
              multiline
              rows={8}
              onChange={formikProps.handleChange}
              value={formikProps.values.comment}
            />
            {formikProps.touched.comment && formikProps.errors.comment && (
              <FormHelperText error>{formikProps.errors.comment}</FormHelperText>
            )}
          </FormControl>
        </PatientFormRow>

        <ButtonsWrapper>
          <DefaultButton title="Voltar" onClick={() => navigate('/patients')} />
          <DefaultButton title="Dar Alta" onClick={() => handleDischarge(formikProps.values)} />
          <DefaultButton title="Criar" type="submit" />
        </ButtonsWrapper>
      </FormWrapper>
    </MainCard>
  );
};

export default PatientFollowUps;
