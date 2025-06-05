import styled from "styled-components";

import { Container, TextField, Button, Typography, Modal } from "@mui/material";   
import { useEffect, useState } from "react";
import React from "react";
import Store from "../../utils/stores/Store";
import API from "../../utils/API";

const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ebfff5;
  height: 100vh;
`;
const ChatMessage = styled.div`
border-radius: 20px;
padding: 10px;
background: #feffcf;
`;
const ChatButton = styled(Button)`
background: #feffcf;
border-radius: 20px;
padding: 10px;
`;

const List=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;
const ListItem=styled.div`
padding: 10px;
border-radius: 20px;
background: #feffcf;
&:active{
  background: #feffcf;
}
`;
const ModalContent=styled(Container)`
display: flex;
flex-direction: column;
gap: 10px;
margin: auto;
`;
const ChatModal=styled(Modal)`
outline: none;
display: flex;
align-items: center;
justify-content: center;
`;
const ChatInput=styled(TextField)`
border-radius: 20px;
padding: 10px;
box-sizing: border-box;
background: #feffcf;
width: 100%;
`;

const Chats = () => {
    const [chats, setChats] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [createChat, setCreateChat] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const [message, setMessage] = useState<string>('');
    useEffect(()=>{
      API.checkUser().then((res)=>{
        Store.setUser(res);
      })
    },[])
    useEffect(() => {
      API.getChats(Store.user['id']).then((res) => {
        setChats(res);
      })
    },[Store.user['id']])
    return (
        <ChatContainer>
          
          {createChat && (
            <ChatModal open={createChat} onClose={()=>{setCreateChat(false)}}>
              <ModalContent>
              <List>
                {users.map((user) => (
                  <ListItem key={user.id} onClick={()=>{
                    setSelectedUser(user.id);
                  }}>
                     <>
                    <Typography>{user.name}</Typography>
                    {selectedUser && selectedUser === user.id && (
                      <>
                      <ChatInput placeholder="Сообщение" value={message} onChange={(e)=>{
                        setMessage(e.target.value);
                      }}/>
                      <ChatButton onClick={()=>{
                        if(message.length > 0){
                        API.createChat(Store.user['id'], user.id).then((res) => {
                          API.sendMessage(res.id, message).then((res) => {
                            setMessage('');
                          setCreateChat(false);
                        })
                        })
                      }
                      }}>Отправить</ChatButton>
                      </>
                    )}
                    </>                      
                
                  </ListItem>
                ))}
              </List>
              </ModalContent>
            </ChatModal>

          )}
            {chats.map((chat) => (
                <ChatMessage key={chat.id}>
                    <Typography>{chat.messages.text}</Typography>
                </ChatMessage>
            ))}
            {chats.length === 0 && (
                <>
                <Typography>Нет сообщений</Typography>
                <ChatButton onClick={()=>{
                    API.getUsers().then((res) => {
                      setCreateChat(true);
                        setUsers(res);
                    })
                }}>Создать чат</ChatButton>
                </>
            )}
        </ChatContainer>
    )
}
export default Chats;