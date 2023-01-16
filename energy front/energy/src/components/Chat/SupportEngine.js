import React, {useRef, useEffect, useState} from 'react'
import Avatar from './Avatar'
import Chat from './Chat';
import ChatEngine from './ChatEngine';
import {over} from 'stompjs'
import SockJS from 'sockjs-client';
import { findUser } from '../../services/UserService';

var stompClient = null;
const SupportEngine = () => {

    const ref = useRef(null)
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState("")

    useEffect(() => {
        registerUser();
        findUser( JSON.parse(localStorage.getItem('user'))).then((res) => {
            setUser(res.data.name) 
         })
        function handleClickOutside(event) {
            if(ref.current && !ref.current.contains(event.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref])

    const registerUser = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
    } 

    const handleClick = () => {
        setVisible(true)
        if(stompClient){
            var chatMessage = {
                message:"",
                destinatar: "ADMIN",
                sender:user,
                status:"SEEN"
            };
            stompClient.send('/user/ADMIN/chat', {}, JSON.stringify(chatMessage));
        }
    }

  return (
    <div ref={ref} >
        <Chat
            visible = {visible}
        />

        <Avatar 
            onClick ={() => handleClick()}
            style={{position: 'fixed', bottom: '24px', right: '24px' }}
        />

        <ChatEngine
            visible = {visible}
        />
    </div>
  )
}

export default SupportEngine