import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { userGetContactAction } from '../../../Redux/Actions/userActions'
import Contacts from '../../../components/Chat/Contacts/Contacts'
import Welcome from '../../../components/Chat/Welcome/Welcome'
import ChatContainer from '../../../components/Chat/ChatContainer/ChatContainer'

function Chat() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  

  const user = useSelector((state) => state.userLoginReducer.userLoginDetails)
  const contactData = useSelector((state)=> state?.userGetContactReducer?.contactData)
  console.log(contactData,'gggggggggggggggggggggggggg')
  const [contacts,setContacts] = useState([])
  const [currentChat,setCurrentChat] = useState(undefined)
  

  useEffect(()=>{
    if(user){
      // const details =async() =>{
       dispatch(userGetContactAction(user.id)).then(()=>{
        if(contactData){
          setContacts(contactData)
        }
       })
      }
    //   details()
    // }
  },[dispatch,user])

  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }

  return (
    <>
    <Container>
      <div className="container">
       <Contacts contacts={contacts} currentUser={user} changeChat={handleChatChange} />
       {
        currentChat === undefined ?
        (<Welcome currentUser={user}/>) :
        (<ChatContainer currentChat={currentChat}/>)
       }
      </div>
    </Container>
    </>
  )
}

const Container = styled.div`
    height : 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: lightblue;
    .container {
      padding:0;
      height: 85vh;
      width: 85vw;
      background-color: #e3e3e3;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: 35% 65%;
      }
    }
`;

export default Chat
