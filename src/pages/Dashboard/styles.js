import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DashHeader = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 172px;
    height: 35px;
    border: 0;
    border-radius: 4px;
    background: #f94d6a;
    color: #fff;

    svg {
      margin-right: 0.5em;
    }
  }
`;

export const MeetupList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const MeetupInfo = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 15px;

  strong {
    color: #fff;
    font-size: 15px;
    line-height: 24px;
  }

  span {
    width: 100%;
    height: 21px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20em;
  }

  button {
    display: flex;
    margin-left: 40px;
    background: none;
    border: 0;
    align-content: center;
    justify-content: center;
  }
`;

export const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  strong {
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    margin: 0 0 15px;
  }
`;
