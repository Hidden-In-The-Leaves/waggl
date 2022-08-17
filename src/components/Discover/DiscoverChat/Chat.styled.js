import styled from "styled-components";

export const Title = styled.div`
  border-bottom: 1px lightgrey solid;
  padding-left: 5%;
  padding-bottom: 20px;
  font-size: 28px;
  font-weight: 900;
  margin: 20px 0;
`;

export const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin: 20px 0;
  padding-left: 5%;
`;
export const ChatContainer = styled.div`
  height: 65vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MessageFromMe = styled.div`
  min-height: 62px;
  min-width: 100px;
  border-radius: 20px;
  color: white;
  background-color: #ff8700;
  font-size: 20px;
  justify-align: center;
  margin: 10px 5%;
  text-align: center;
`;

export const Message = styled.p`
  padding: 0 10px;
`;

export const MessageFromOther = styled.div`
  min-height: 62px;
  min-width: 100px;
  border-radius: 20px;
  color: black;
  background-color: rgba(217, 217, 217, 0.35);
  font-size: 20px;
  justify-align: center;
  margin: 10px 5%;
  text-align: center;
`;

export const MessageInput = styled.input`
  height: 100%;
  border-radius: 20px;
  width: 75%;
  margin: 20px 20px 0 10%;
  border: 1px solid #9f9f9f;
  box-sizing: border-box;
  font-size: 20px;
  padding: 0 10px;
`;

export const MessageSendIcon = styled.i`
  font-size: 30px;
  color: lightgrey;
`;

export const CircleImage = styled.img`
  height: 55px;
  width: 55px;
  border-radius: 50%;
`;

export const MessageFromOtherContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageInputContainer = styled.div`
  height: 60px;
`;
