import React, { useState } from "react";
import { Input } from 'antd';
import {Button,Space,notification} from 'antd';
import { styled } from "styled-components";
import LinkStyle from "../Common/LinkStyle";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import type { NotificationPlacement } from 'antd/es/notification/interface';

const FlexBox=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    min-height: 100vh;
`

// const userData={
//     username:"public@ewinsonic.com",
//     password:"password"
// };


interface loginProps{
    setToken:React.Dispatch<React.SetStateAction<string>>;
}

// let token:string="";
function Login(props:loginProps){
    const [AccValue,setAccValue]=useState("");
    const [PassValue,setPassValue]=useState("");
    const navigate=useNavigate();
    const [api, contextHolder] = notification.useNotification();
    
    const userData={
        query:`
        query{
            login(input:{username:"${AccValue}",password:"${PassValue}"}){
             admin: user{
                accountName
              email
              }
              token
            }
          }
          
        `
    };
    function login(){
        axios.post('http://192.168.11.226:9095/graphql',userData)
        .then(function(response){
            // console.log(response.data);
            if(response.data.data.login!==null){
                props.setToken(response.data.data.login.token)
                // console.log(token);
                navigate('/users');
            }
            else{
                openNotification('top');
            }
        })
        .catch(function(response){
        });
    }
    
    const handleAccChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value;
        setAccValue(value);
    }
    const handlePassChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value;
        setPassValue(value);
    }

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `帳號或密碼錯誤`,
            description:
            '請重新輸入',
            placement,
            duration:3
        });
    };

    return(
        <>
            {contextHolder}
            <FlexBox>
                <Space.Compact>
                    <span style={{width:"50%"}}>帳號:</span>
                    <Input placeholder="請輸入帳號"  onChange={handleAccChange} value={AccValue}/>
                </Space.Compact>
                <Space.Compact>
                    <span style={{width:"50%"}}>密碼:</span>
                    <Input type="password" placeholder="請輸入密碼" onChange={handlePassChange} value={PassValue} />
                </Space.Compact>

                <Button style={{width:"20%",margin:"20px auto"}} onClick={()=>{login()}} >登入</Button>
            </FlexBox>
        </>
        
    );
}

export default Login;

