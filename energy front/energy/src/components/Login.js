import React from 'react'
import "../styles/LogIn.css";
import { useState } from "react";
import { authorize } from '../services/LoginService';
import { useNavigate } from "react-router-dom";
import background from "../images/img1.jpeg";
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';

const Bacground = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;
var stompClient =null;
function Login() {

    let navigate = useNavigate();
    const [nume, setNume] = useState("");
    const [parola, setParola] = useState("");

    const handleSubmit = (e) => {
        authorize(nume, parola).then((res) => {
          console.log(res.data)
          if (res.data.rol === "ADMIN") {
            localStorage.setItem("user", JSON.stringify(res.data.id));
            localStorage.setItem("rol", JSON.stringify("ADMIN"));
            navigate("/admin");
          }
          else if (res.data.rol === "USER") {
            localStorage.setItem("user", JSON.stringify(res.data.id));
            localStorage.setItem("rol", JSON.stringify("USER"));

            let Sock = new SockJS('http://localhost:8080/ws');
            stompClient = over(Sock);
            stompClient.connect({},onConnected);

            navigate("/user");
          }
          else{
            console.log(res.data)
            alert("Gresit tati");
            setNume("");
            setParola("");
          }

        })
    }

    const onConnected = () => {
      stompClient.subscribe('/user/'+nume+'/private', onPrivateMessage);
      console.log("User-ul: " + nume + " s-a conectat")
    } 

    const onPrivateMessage = (payload) => {
      let message = payload.body;
      console.log(message);
      alert(message);
    }

    return (
      <Bacground style={{ backgroundImage: `url(${background})` }}>
          <div style={{ width: "100vh", height: "100vh" }}>
            <form>
              <div className="center">
                <h1>Login</h1>
                <form method="post">
                  <div className="txt_field">
                    <input
                      className="fill"
                      type="text"
                      name="username"
                      value={nume}
                      onChange={(e) => setNume(e.target.value)}
                    />
                    <span></span>
                    <label>Username</label>
                  </div>
    
                  <div className="txt_field">
                    <input
                      className="fill"
                      type="password"
                      name="password"
                      value={parola}
                      onChange={(e) => setParola(e.target.value)}
                    />
                    <span></span>
                    <label>Password</label>
                  </div>
                  <input type="button" value="Login" onClick={handleSubmit}></input>
                </form>
              </div>
            </form>
          </div>
          </Bacground>
      );
}

export default Login