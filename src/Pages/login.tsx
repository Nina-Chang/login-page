import React, { useState } from "react";
import { Input } from 'antd';
import {Button,Space} from 'antd';
import { styled } from "styled-components";
import LinkStyle from "../Common/LinkStyle";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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

var tData:string="";
export function gtn(data:string){
    tData=data;
    // console.log(tData);
    return data;
}
export {tData};

// export const test='test231';

// function getToken(data:string){
//     return data;
// }

interface loginProps{
    setToken:React.Dispatch<React.SetStateAction<string>>;
}

// let token:string="";
function Login(props:loginProps){
    const [AccValue,setAccValue]=useState("");
    const [PassValue,setPassValue]=useState("");
    const [LoginOrNot,setLoginOrNot]=useState(false); 
    const navigate=useNavigate();
    
    const userData={
        query:`
        query  login12 {
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
            // console.log(response.data.data.login.token);
            if(response.data.data.login!==null){
                setLoginOrNot(true);
        
                props.setToken(response.data.data.login.token)
                // console.log(token);
                navigate('/users');
            }
        })
        .catch(function(response){
            setLoginOrNot(false);
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
    return(
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
        
    );
}

export default Login;

