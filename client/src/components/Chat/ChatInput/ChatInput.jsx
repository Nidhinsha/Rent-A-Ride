import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"
import styled from 'styled-components'

function ChatInput({ handleSendMessage }) {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }


  const handleEmojiClick = (emojiData, event) => {
    let message = msg;
    message += emojiData.emoji
    setMsg(message)
  }

  // send chat
  const sendChat = (event) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMessage(msg.trim())
      setMsg('')
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>

      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder='type your messages here'
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`

display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #b4c7dd;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -480px;
        box-shadow: 0 5px 10px #054D60;
        border-color: #054D60;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #ffff;
          width: 5px;
          &-thumb {
            background-color: #054D60;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-emoji-list:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #737373;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0f8aab;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`

export default ChatInput