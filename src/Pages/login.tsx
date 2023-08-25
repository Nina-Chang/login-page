import React, { useState } from "react";
import { Input } from 'antd';
import {Button,Space} from 'antd';
import { styled } from "styled-components";
import LinkStyle from "../Common/LinkStyle";
import axios from 'axios';

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
export function getToken(data:string){
    tData=data;
    return data;
}

export {tData};

// export const test='test231';


function Login(){
    const [AccValue,setAccValue]=useState("");
    const [PassValue,setPassValue]=useState("");
    const [LoginOrNot,setLoginOrNot]=useState(false);   
    
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
    function get(){
        axios.post('http://192.168.11.226:9095/graphql',userData)
        .then(function(response){
            // console.log(response.data.data.login.token);
            if(response.data.data.login!==null){
                setLoginOrNot(true);
                const tokendata=response.data.data.login.token;
                getToken(tokendata);
            }
        })
        .catch(function(response){
            setLoginOrNot(false);
        });
    }
    get();

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
            {LoginOrNot?
            (<LinkStyle to="/users">
            <Button style={{width:"120%",margin:"20px auto"}} >登入</Button>
            </LinkStyle>)
            :
            (<Button style={{width:"15%",margin:"20px auto"}}>登入</Button>)}
        </FlexBox>
        
    );
}

export default Login;

