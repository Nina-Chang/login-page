import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table ,Spin} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import LinkStyle from "../Common/LinkStyle";
import axios from 'axios';
// import {GraphQLClient,gql}from "graphql-request";



// const endpoint='http://jsonplaceholder.typicode.com/users';
// const client=new GraphQLClient(endpoint,{
//     method:'GET',
//     jsonSerializer:{
//         parse:JSON.parse,
//         stringify:JSON.stringify
//     }
// });
// const query=gql`
//     {
//         id
//         name
//         email
//         website
//         company{
//             name
//         }
//     }   
// `
// const variables={
//     title:`id`,
// }
// client.request(query)
//     .then(console.log)
//     .catch(console.error);
// {
//     headers:{
//         Authorization:`Bearer <PERSONAL_ACCESS_TOKEN>`
//     }
// }
// for(let i=1;i<11;i++){
//     client.request(query,{id:1})
//     .then(results=>JSON.stringify(results))
//     .then(console.log)
//     .catch(console.error);
// }
// client.request('http://jsonplaceholder.typicode.com/users',query,variables)
//     .then(results=>JSON.stringify(results))
//     .then(console.log)
//     .catch(console.error);
// 

interface User{
    id:number;
    name:string;
    email:string;
    website:string;
    company:string;
}
// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }


const columns: ColumnsType<User> = [
{
    title: 'Id',
    dataIndex: 'id',
},
{
    title: 'Name',
    dataIndex: 'name',
},
{
    title: 'Email',
    dataIndex: 'email',
},
{
    title: 'Website',
    dataIndex: 'website',
},
{
    title: 'Company Name',
    dataIndex: 'company',
},
];
// const columns: ColumnsType<DataType> = [
// {
//     title: 'Name',
//     dataIndex: 'name',
// },
// {
//     title: 'Age',
//     dataIndex: 'age',
// },
// {
//     title: 'Address',
//     dataIndex: 'address',
// },
// ];

// const dataInfo=(resp:object)=>{
//     // console.log(resp);
//     return resp;
// }



// const data: DataType[] = [];
// for (let i = 0; i < 10; i++) {
// data.push({
//     key: i,
//     id:i+1,
//     name: `3`,
//     email:`string`,
//     website:`string`,
//     company:`string`,
// });
// console.log(data);
// }

function Users() {
const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
const [loading, setLoading] = useState(false);
const [dataSource,setDataSource]=useState<User[]>([]);
const dataContent: User[] = [];

useEffect(()=>{
    setLoading(true);
    axios
    .get("https://jsonplaceholder.typicode.com/users/")  
    .then(function (response) {
            const {data:[...object]}=response;
            // console.log(JSON.stringify(object[0].company.name));
            // console.log(JSON.stringify(response));
            for (let i = 0; i < 10; i++) {
                dataContent.push({
                    id:i+1,
                    name:object[i].name,
                    email:object[i].email,
                    website:object[i].website,
                    company:object[i].company.name,
                });
            }
            setDataSource(dataContent);
        })
    .catch(function(){
        setLoading(true); 
    })
    .finally(function(){
        setLoading(false);
    })
},[])

const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
    setSelectedRowKeys([]);
    setLoading(false);
    }, 1000);
};

const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
};

const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
};
const hasSelected = selectedRowKeys.length > 0;

return (
    <div>
    <div style={{ marginBottom: 16 }}>
        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
        Reload
        </Button> */}
        <Spin spinning={loading}/>
        <LinkStyle to="/login">
            <Button>Reload</Button>
        </LinkStyle>
        <LinkStyle to="/accounts">
            <Button>Account</Button>
        </LinkStyle>
        <span style={{ marginLeft: 8 }}>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
    </div>
    <Table 
        rowKey={(record:User) => record.id-1}
        columns={columns} 
        dataSource={dataSource} 
    />
    </div>
);
};
  

export default Users;