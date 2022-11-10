"use client";
import styled from '@emotion/styled';
import Image from 'next/image';
import img from '../../assets/images/signin-image.jpeg';
import {useState} from "react";
import Login from "../../components/login-signup/Login";
import SignUp from "../../components/login-signup/SignUp";

export default function LoginSignUp(){
    const [tab, setTab] = useState(true);

    const ActiveButton = {
      backgroundColor: "var(--main-blue-color)",
      color: "white"
    }

    const PassiveButton = {
      backgroundColor: "var(--backgrounf-gray-color)",
      color: 'black',
    }

    return (
        <Main>
            <LoginSign>
                <div>
                    <Image alt='signup-image image' src={img} />
                </div>
                <div>
                    <ButtonContainer>
                        <button
                            onClick={() => setTab(true)}
                            style={tab ? ActiveButton : PassiveButton}
                        >Login</button>
                        <button
                            onClick={() => setTab(false)}
                            style={!tab ? ActiveButton : PassiveButton}
                        >Sign up</button>
                    </ButtonContainer>
                    {
                        tab? <Login/>: <SignUp/>
                    }
                </div>
            </LoginSign>
        </Main>
    )
}


//// -----------------style-----------------
const Main = styled.main`
  display: flex;
  justify-content: center;
  margin: 130px 0;
`

const LoginSign = styled.section`
  padding: 60px 100px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  gap: 80px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: start;
  
  button{
    padding: 10px 50px;
    font-size: 20px;
    border: none;
    cursor: pointer;
  }
`