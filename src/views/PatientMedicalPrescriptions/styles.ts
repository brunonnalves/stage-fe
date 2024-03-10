import styled from '@emotion/styled';

export const FormWrapper = styled.form`
  padding: 10px 30px 30px 30px;
  width: 100%;
`;

export const PatientFormRow = styled.div<{ gridTemplateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props: { gridTemplateColumns: string }) => props.gridTemplateColumns};
  column-gap: 30px;
  padding: 20px 8px;
`;

export const LabelCel = styled.p`
  padding-bottom: 8px;
  font-size: 14px;
  & > span {
    color: red;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 35px;
  padding-top: 20px;
`;
