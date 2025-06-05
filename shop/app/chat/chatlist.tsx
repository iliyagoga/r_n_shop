


import { Button, Container, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../utils/API";
import React from "react";
import Store from "../../utils/stores/Store";
const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ebfff5;
`;
const ChatMessage = styled.div`
border-radius: 20px;
padding: 10px;
background: #feffcf;
`;


const ChatList = observer(() => {
  const [chats, setChats] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    API.getChats(Store.user['id']).then((res) => {
      setChats(res);
    });
  }, []);
  return (
    <ChatContainer>
      {chats.map((chat) => (
        <ChatMessage key={chat.id}>
          <Typography>{chat.messages.text}</Typography>
        </ChatMessage>
      ))}

    </ChatContainer>
  );
});

export default ChatList;
