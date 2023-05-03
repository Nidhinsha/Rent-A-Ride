import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Contacts from '../../../components/Chat/Contacts/Contacts'
import Welcome from '../../../components/Chat/Welcome/Welcome'
import ChatContainer from '../../../components/Chat/ChatContainer/ChatContainer'
import { io } from "socket.io-client"
import { getAllUserContacts } from '../../../Api/User/ApiCalls'
import NavBar from '../../../components/NavBar/NavBar'
import Footer from '../../../components/Home/Footer/Footer'
const socket = io("https://rentaride.online")

function Chat() {

  const user = useSelector((state) => state.userLoginReducer.userLoginDetails)
  const contactData = useSelector((state) => state?.userGetContactReducer?.contactData)
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)


  useEffect(() => {
   
    if (user) {
      const details = async () => {
       getAllUserContacts(user.id).then((data)=>{
         setContacts(data.data)
       })
      }
      details()
    }
  },[])


  useEffect(() => {
    if (user) {
      socket.emit("add-user", user.id)
    }
  })
  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <>
    <NavBar/>
      <Container >
        <div className="container">
         
              <Contacts contacts={contacts} currentUser={user} changeChat={handleChatChange} />
             
          {
            currentChat === undefined ?
              (<Welcome currentUser={user} />) :
              (<ChatContainer currentChat={currentChat} currentUser={user} socket={socket} />)
          }
        </div>
      </Container>
      <Footer/>
    </>
  )
}

const Container = styled.div`
    height : 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    border-radius:50px;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    
    .container {
      padding:0;
      height: 100vh;
      width: 100vw;
      background-color: #e3e3e3;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: 35% 65%;
      }
    }
`;

export default Chat
