import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserPhoto, setCurrentUserPhoto] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserPhoto(currentUser.photo)
      setCurrentUserName(currentUser.firstName)
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <>
      {
        currentUserName && (
          <Container>
            <div className="brand">
              <img src='https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg' alt="logo" />
              <h3>Rent-A-Ride</h3>
            </div>
            <div className="contacts">
              {
                contacts ? contacts.map((contact, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`contact ${index === currentSelected ? "selected" : "Not selected"}`}
                        onClick={() => changeCurrentChat(index, contact)}
                      >
                        <div className="avatar">
                          <img src={contact.photo} alt="profile" width={50} />
                        </div>
                        <div className="username">
                          <p className='mb-0'>{contact.firstName + " " + contact.lastName}</p>
                        </div>
                      </div>
                      <Divider />
                    </>
                  )
                })
                  : "No contacts"
              }
            </div>

            <div className="current-user">
              <div className="avatar">
                <img src={currentUserPhoto} alt="sender" />
              </div>

              <div className="username">
                <p className='mb-0'>{currentUserName}</p>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  background-color: #E9E9E9;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
      
    }
    p {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #0070C0;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
          font-weight: bold;
      .avatar {
        img {
          height: 3rem;
          border-radius:20px
        }
      }
      .username {
        p {
          color: white;
        }
      }
    }
    .selected {
      background-color: #0070C0;
    }
  }
  .current-user {
    background-color:#333333;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 4rem;
        width:80px;
        max-inline-size: 100%;
        border-radius:20px
      }
    }
    .username {
      p {
       font-weight: bold;
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        p {
          font-size: 1rem;
        }
      }
    }
  }
`

export default Contacts
