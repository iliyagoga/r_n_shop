


import { Button, Container, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../utils/API";
import React from "react";
import Store from "../../utils/stores/Store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MenuComponent from "../../components/MenuComponent";

const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background: #fff;
  height: max-content;
  padding: 0;
  margin-top: 10px;
`;

const ChatMessage = styled.div<{isSelf: boolean}>`
  border-radius: 8px;
  padding: 8px 12px;
  background: ${props => props.isSelf ? '#eeffde' : '#fff'};
  width: fit-content;
  max-width: 70%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  word-wrap: break-word;
`;

const MessagesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  height: 70vh;
  padding: 10px;
  background: #efeae2;
`;

const ChatHeader = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: #517da2;
  color: white;
  height: 48px;
`;

const ChatForm = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  height: max-content;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #e5e5e5;
`;

const ChatTextarea = styled(TextField)`
  width: 100%;
  height: 100%;
  .MuiOutlinedInput-root {
    border-radius: 18px;
    background: #fff;
  }
  .MuiOutlinedInput-input {
    padding: 8px 14px;
  }
`;

const ChatButton = styled(Button)`
  background: #517da2;
  color: white;
  border-radius: 50%;
  min-width: 36px;
  width: 36px;
  height: 36px;
  padding: 0;
  
  &:hover {
    background: #426487;
  }
`;

const Chat = observer(() => {
  const { id } = useLocalSearchParams();
  const [chat, setChat] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const navigation = useNavigation();
  
  useEffect(() => {
    API.getChat(id, Store.user['id']).then((res) => {
      setChat(res);
    });
  }, [Store.user]);

  useEffect(()=>{
    API.checkUser().then((res)=>{
      Store.setUser(res);
    })
  },[])

  useEffect(()=>{
    API.getMessages(id).then((res) => {
      setMessages(res);
    });
  },[id])

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      API.getMessages(id).then((res) => {
        setMessages(res);
      });
    },1000);
    return ()=>{
      clearInterval(interval);
    }
  },[id])

  return (<>
    <MenuComponent/>
    <ChatContainer>
      <ChatHeader>
        <Typography variant="subtitle1" style={{fontWeight: 500}}>
          {chat?.user.name} {chat?.user.family}
        </Typography>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            isSelf={message.user_id === Store.user['id']}
            style={{
              marginLeft: message.user_id === Store.user['id'] ? 'auto' : '0'
            }}
          >
            <Typography style={{fontSize: '14px'}}>{message.text}</Typography>
          </ChatMessage>
        ))}
      </MessagesContainer>

      <ChatForm>
        <ChatTextarea 
          placeholder="Сообщение" 
          value={message} 
          onChange={(e)=>{
            setMessage(e.target.value);
          }}
          multiline
          maxRows={1}
        />
        <ChatButton 
          onClick={()=>{
            if (message.trim()) {
              API.sendMessage(id, message).then((res) => {
                setMessages([...messages, res]);
                setMessage('');
              });
            }
          }}
        >
          ➤
        </ChatButton>
      </ChatForm>
    </ChatContainer>
  </>);
});

export default Chat;
