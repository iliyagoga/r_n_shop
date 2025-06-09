import styled from "styled-components";

import { Container, TextField, Button, Typography, Modal, CircularProgress } from "@mui/material";   
import { useEffect, useState } from "react";
import React from "react";
import Store from "../../utils/stores/Store";
import API from "../../utils/API";
import { router, useNavigation } from "expo-router";
import { observer } from "mobx-react-lite";
import MenuComponent from "../../components/MenuComponent";

const ChatContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-top: 20px;
  box-sizing: border-box;
  height: 100vh;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
`;

const CustomSpinner = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: #0088cc;
  }
`;

const ChatMessage = styled.div`
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const ChatButton = styled(Button)`
  background: #0088cc;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  text-transform: none;
  font-weight: 500;
  
  &:hover {
    background: #0077b3;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-radius: 8px;
`;

const ListItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const ModalContent = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const ChatModal = styled(Modal)`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
`;

const ChatInput = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 8px;
    background: #fff;
  }
  
  .MuiOutlinedInput-input {
    padding: 12px;
  }
`;

const Chats = observer(() => {
    const [chats, setChats] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [createChat, setCreateChat] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigation = useNavigation();
    
    useEffect(()=>{
      API.checkUser().then((res)=>{
        Store.setUser(res);
      })
    },[])
    
    useEffect(() => {
      setIsLoading(true);
      API.getChats(Store.user['id']).then((res) => {
        setChats(res);
        setIsLoading(false);
      })
    },[Store.user['id']])

    useEffect(()=>{
      const interval = setInterval(()=>{
        API.getChats(Store.user['id']).then((res) => {
          setChats(res)
          console.log(res,Store.user['id'])
        })
      },1000)
      return ()=>{
        clearInterval(interval)
      }
    },[Store.user['id']])

    useEffect(()=>{
      navigation.setOptions({ headerShown: false });
    },[navigation])

    if (isLoading) {
      return (
        <>
          <MenuComponent/>
          <ChatContainer>
            <LoaderContainer>
              <CustomSpinner size={50} />
              <Typography variant="h6" color="textSecondary">
                Загрузка чатов...
              </Typography>
            </LoaderContainer>
          </ChatContainer>
        </>
      )
    }

    return (
      <>
      <MenuComponent/>
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
                        <Typography variant="subtitle1" style={{fontWeight: 500}}>{user.name}</Typography>
                        {selectedUser && selectedUser === user.id && (
                          <>
                            <ChatInput 
                              fullWidth
                              placeholder="Сообщение" 
                              value={message} 
                              onChange={(e)=>{
                                setMessage(e.target.value);
                              }}
                            />
                            <ChatButton 
                              fullWidth
                              onClick={()=>{
                                if(message.length > 0){
                                  API.createChat(Store.user['id'], user.id).then((res) => {
                                    API.sendMessage(res.id, message, Store.user['id'], user.id).then((res) => {
                                      setMessage('');
                                      setCreateChat(false);
                                    })
                                  })
                                }
                              }}
                            >
                              Отправить
                            </ChatButton>
                          </>
                        )}
                      </>                      
                    </ListItem>
                  ))}
                </List>
              </ModalContent>
            </ChatModal>
          )}

          {chats.length > 0 && chats.map((chat) => (
            <ChatMessage key={chat.id} onClick={()=>{
              router.push('/chat/'+chat.id);
            }}>
              <Typography variant="subtitle1" style={{fontWeight: 500}}>
                {chat.user.name} {chat.user.family}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {chat.messages.text.length<=30 ? chat.messages.text : chat.messages.text.slice(0,30)+"..."}
              </Typography>
            </ChatMessage>
          ))}

            <>
             {chats.length === 0 && <Typography variant="h6" align="center" style={{margin: '20px 0'}}>
                Нет сообщений
              </Typography>}
              <ChatButton 
                fullWidth
                onClick={()=>{
                  API.getUsers().then((res) => {
                    setCreateChat(true);
                    setUsers(res);
                  })
                }}
              >
                Создать чат
              </ChatButton>
            </>
          
        </ChatContainer>
        </>
    )
})

export default Chats;