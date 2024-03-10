import styled from '@emotion/styled';

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 24px;
  & > :first-of-type {
    display: flex;
    gap: 30px;
    align-items: center;
    width: 100%;
    padding-bottom: 36px;
    padding-left: 8px;
  }
`;

export const ListHeader = styled.span`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 12px;
  align-items: center;
  background-color: #1e1e3f;
  font-size: 16px;
  font-weight: bold;
  color: ${(props: any) => (props.theme == 'light' ? '#fff' : undefined)};
  border-radius: 8px 8px 0 0;
  & > span {
    flex: 1;
    text-align: center;
  }
  & > :first-of-type {
    flex: 2;
  }
`;

export const ListRow = styled.span`
  display: flex;
  width: 100%;
  background-color: ${(props: any) => props.color};
  align-items: center;
  height: 70px;
  padding: 12px;
  font-size: 14px;
  & > span {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  & > :first-of-type {
    flex: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StatusContainer = styled.span<{ status: 'IN_PROGRESS' | 'FINISHED' | string }>`
  display: flex;
  min-width: 90px;
  width: 70%;
  height: 20px;
  border-radius: 10px;
  background: ${(props: any) =>
    (props.status === 'IN_PROGRESS' && '#FCFF55') || (props.status === 'FINISHED' && '#26FF49')};
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
`;
