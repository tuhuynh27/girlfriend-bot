import React, { createRef, useEffect, useState } from 'react'
import './App.scss'

import ProfilePopup from './components/profile-popup/ProfilePopups.jsx'

function App({ profile = {
  name: 'Tu Huynh',
  image: 'https://d33wubrfki0l68.cloudfront.net/19e8b1005d45f56e2c10ad30e215298ce50c677e/6f09c/tu-huynh.jpg',
}}) {
  const [listMessages, setListMessages] = useState([])
  const [message, setMessage] = useState('')
  const messagesRef = createRef()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  useEffect(scrollToBottom, [messagesRef, listMessages]);

  function handleKeyDown(e) {
    if (isProcessing) return

    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      void sendMsg()
    }
  }

  async function sendMsg() {
    if (message.trim() !== '') {
      setListMessages(l => [...l, {
        id: Math.random(),
        text: message,
        isMe: true
      }])
      setMessage('')
      try {
        setIsProcessing(true)
        const reply = await getResponseFromAiBot(message);
        botReply(reply);
      } finally {
        setIsProcessing(false)
      }
    }
  }

  async function getResponseFromAiBot(msg) {
    const resp = await fetch(`https://ai-bot.tuhuynh.com/?text=${msg}`);
    const json = await resp.json();
    return json.msg;
  }

  function botReply(msg) {
    setListMessages( l => [...l, {
      id: Math.random(),
      text: msg,
      isMe: false
    }])
  }

  // function botReply(msg, delay = Math.random() * (3000 - 1000) + 1000) {
  //   setTimeout(() => {
  //     setListMessages( l => [...l, {
  //       id: Math.random(),
  //       text: msg,
  //       isMe: false
  //     }])
  //   }, delay)
  // }

  return (
    <React.Fragment>
      <div className="messages-page">
        <div className="top-bar">
          <div className="back-button">
            <svg focusable="false" aria-hidden="true" role="presentation" viewBox="0 0 24 24" width="24px" height="24px">
              <path className="Fill($c-pink)"
                    fill="#ff4458"
                    d="M13.98 20.717a1.79 1.79 0 0 0 2.685 0 1.79 1.79 0 0 0 0-2.684l-7.158-6.62 7.158-6.8a1.79 1.79 0 0 0 0-2.684 1.79 1.79 0 0 0-2.684 0L5.929 9.98a1.79 1.79 0 0 0 0 2.684l8.052 8.052z"/>
            </svg>
          </div>
          <div className="title" onClick={() => setIsProfileOpen(true)}>
            <div className="image" style={{ backgroundImage: `url('${profile.image}')` }} />
            <div className="name">
              {profile.name}
            </div>
          </div>
          <div className="option-button">
            <svg focusable="false" aria-hidden="false" role="img" viewBox="0 0 8 24" width="28px" height="28px"
                 className="Rotate(90deg)" aria-labelledby="5e18b952d4a8b7fe c74a86a75370a4b3">
              <path fill="#ff4458" fillRule="evenodd"
                    d="M.653 3.439C.653 1.606 2.182.12 4.067.12 5.952.12 7.48 1.606 7.48 3.439c0 1.832-1.528 3.318-3.413 3.318-1.885 0-3.414-1.486-3.414-3.318zm0 8.628c0-1.833 1.529-3.319 3.414-3.319 1.885 0 3.413 1.486 3.413 3.319 0 1.832-1.528 3.318-3.413 3.318-1.885 0-3.414-1.486-3.414-3.318zm0 8.628c0-1.833 1.529-3.319 3.414-3.319 1.885 0 3.413 1.486 3.413 3.319s-1.528 3.318-3.413 3.318c-1.885 0-3.414-1.485-3.414-3.318z"/>
              <title id="5e18b952d4a8b7fe">Options</title>
              <desc id="c74a86a75370a4b3">Options</desc>
            </svg>
          </div>
        </div>
        <div className="bottom-bar">
          <textarea rows="1" placeholder="Nhập tin nhắn"
                    onKeyDown={handleKeyDown}
                    value={message} onChange={e => setMessage(e.target.value)}/>
            <div className="send-button">
              <button disabled={message.length === 0 || isProcessing === true} onClick={() => sendMsg()}>Gửi</button>
            </div>
        </div>
        {listMessages.length === 0 && <div className="no-message" onClick={() => setIsProfileOpen(true)}>
          <div className="text">
            <h1>Đây là Bot của <strong>{profile.name}</strong></h1>
            <p>muốn nhắn gì thì nhắn đi</p>
          </div>
          <div className="image" style={{ backgroundImage: `url('${profile.image}')` }}/>
        </div>}
        {listMessages.length > 0 &&
          <div className="conversation" ref={messagesRef}>
            <ul>
              {listMessages.map(msg => (
                <li key={msg.id} className={msg.isMe ? 'me' : 'him'}>
                  {msg.text}
                </li>
              ))}
            </ul>
          </div>}
      </div>
      <ProfilePopup profile={profile} isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
    </React.Fragment>
  )
}

export default App
