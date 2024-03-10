// material-ui
import { Button, Divider, Link, Typography } from '@mui/material';

// third-party

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { useStore } from '../../store';
import { IExamination, IFollowUp, IMedicalPrescription, IMedicalRecord } from '../../types/patient';

// ============================|| PATIENT VIEW PAGE - DRAWER RIGHT ||============================ //

const PatientView = () => {
  const patientObject = useStore((state) => state.patient);
  const closeRightDrawer = useStore((state) => state.closeRightDrawer);
  let medicalRecordHistory: IMedicalRecord[] | undefined;
  let lastMedicalRecord: IMedicalRecord | undefined;
  let followUps: IFollowUp[] | undefined;
  let activeMedicalPrescriptions: IMedicalPrescription[] | undefined;
  let examinations: IExamination[] | undefined;

  if (patientObject && patientObject.medicalRecords) {
    medicalRecordHistory = [...patientObject.medicalRecords];
    medicalRecordHistory.splice(-1, 1);
    lastMedicalRecord = {
      ...patientObject.medicalRecords[patientObject.medicalRecords.length - 1],
    };
    if (lastMedicalRecord.followUp && lastMedicalRecord.status === 'IN_PROGRESS') {
      followUps = [...lastMedicalRecord.followUp];
    }
    if (lastMedicalRecord.medicalPrescription) {
      activeMedicalPrescriptions = lastMedicalRecord.medicalPrescription.filter(
        (element) => !element.endDate
      );
    }
    if (lastMedicalRecord.examinations) {
      examinations = [...lastMedicalRecord.examinations];
    }
  }

  return (
    <MainCard title="Paciente">
      <Typography component="h1" mb="12px" sx={{ fontSize: 18, fontWeight: 600 }}>
        Dados pessoais
      </Typography>
      <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
        <Typography component="p" sx={{ textTransform: 'capitalize' }}>
          Nome: {patientObject.name}
        </Typography>
        <Typography component="p">Data de nascimento: {patientObject.birthDate}</Typography>
        <Typography component="p" sx={{ textTransform: 'capitalize' }}>
          Endereço:{' '}
          {patientObject.address
            ? `${patientObject.address?.street} ${patientObject.address.number}, ${patientObject.address?.complement}`
            : ''}
        </Typography>
        <Typography component="p" sx={{ textTransform: 'capitalize' }}>
          CEP: {patientObject.address?.postalCode}
        </Typography>
      </Typography>

      <Typography component="h1" mb="12px" sx={{ fontSize: 18, fontWeight: 600 }}>
        Protuário (Últimas informações)
      </Typography>
      <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
        <Typography component="p">Evolução do paciente</Typography>
        {followUps && followUps.length > 0 ? (
          followUps.map((followUp) => (
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">Data: {followUp.date}</Typography>
              <Typography component="p">Comentário: {followUp.comment}</Typography>
            </Typography>
          ))
        ) : (
          <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
            <Typography component="p">Sem informações</Typography>
          </Typography>
        )}
      </Typography>
      <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
        <Typography component="p">Prescrição médica</Typography>
        {activeMedicalPrescriptions && activeMedicalPrescriptions.length > 0 ? (
          activeMedicalPrescriptions.map((activeMedicalPrescription) => (
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">
                Medicamento: {activeMedicalPrescription.medicine}
              </Typography>
              <Typography component="p">Dose: {activeMedicalPrescription.dose}</Typography>
              <Typography component="p">
                Data de início: {activeMedicalPrescription.startDate}
              </Typography>
            </Typography>
          ))
        ) : (
          <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
            <Typography component="p">Sem informações</Typography>
          </Typography>
        )}
      </Typography>
      <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
        <Typography component="p">Exames</Typography>
        {examinations && examinations.length > 0 ? (
          examinations.map((examination) => (
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">Exame: {examination.name}</Typography>
              <Typography component="p">Data da requisição: {examination.requestDate}</Typography>
              <Typography component="p">Data do resultado: {examination.resultDate}</Typography>
              <Typography component="p">Laudo médico: {examination.clinicalReport}</Typography>
              <Typography component="p">Resultados: {examination.result}</Typography>
            </Typography>
          ))
        ) : (
          <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
            <Typography component="p">Sem informações</Typography>
          </Typography>
        )}
      </Typography>

      <Typography component="h1" mb="12px" sx={{ fontSize: 18, fontWeight: 600 }}>
        Histórico médico
      </Typography>
      {medicalRecordHistory && medicalRecordHistory.length > 0 ? (
        medicalRecordHistory.map((medicalRecord, index) => (
          <>
            <Typography component="h3" mb="12px" sx={{ fontSize: 16, fontWeight: 500 }}>
              {index + 1} Internação
            </Typography>
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">Evolução do paciente</Typography>
              {medicalRecord.followUp ? (
                medicalRecord.followUp.map((followUp) => (
                  <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                    <Typography component="p">Data: {followUp.date}</Typography>
                    <Typography component="p">Comentário: {followUp.comment}</Typography>
                  </Typography>
                ))
              ) : (
                <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                  <Typography component="p">Sem informações</Typography>
                </Typography>
              )}
            </Typography>
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">Prescrição médica</Typography>
              {medicalRecord.medicalPrescription ? (
                medicalRecord.medicalPrescription.map((medicalPrescription) => (
                  <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                    <>
                      <Typography component="p">
                        Medicamento: {medicalPrescription.medicine}
                      </Typography>
                      <Typography component="p">Dose: {medicalPrescription.dose}</Typography>
                      <Typography component="p">
                        Data de início: {medicalPrescription.startDate}
                      </Typography>
                    </>
                  </Typography>
                ))
              ) : (
                <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                  <Typography component="p">Sem informações</Typography>
                </Typography>
              )}
            </Typography>
            <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
              <Typography component="p">Exames</Typography>
              {medicalRecord.examinations ? (
                medicalRecord.examinations.map((examination) => (
                  <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                    <>
                      <Typography component="p">Exame: {examination.name}</Typography>
                      <Typography component="p">
                        Data da requisição: {examination.requestDate}
                      </Typography>
                      <Typography component="p">
                        Data do resultado: {examination.resultDate}
                      </Typography>
                      <Typography component="p">
                        Laudo médico: {examination.clinicalReport}
                      </Typography>
                      <Typography component="p">Resultados: {examination.result}</Typography>
                    </>
                  </Typography>
                ))
              ) : (
                <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
                  <Typography component="p">Sem informações</Typography>
                </Typography>
              )}
            </Typography>
          </>
        ))
      ) : (
        <Typography component="ul" mb="12px" sx={{ fontSize: 14, fontWeight: 500 }}>
          <Typography component="p">Sem histórico médico</Typography>
        </Typography>
      )}

      <Divider />
      <Button onClick={() => closeRightDrawer()}>Fechar</Button>
    </MainCard>
  );
};

export default PatientView;
