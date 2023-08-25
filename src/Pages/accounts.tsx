import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table,Button, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import LinkStyle from '../Common/LinkStyle';
// import axios from 'axios';
// import {test} from './login';
import { tData } from './login';
import {gql,GraphQLClient} from 'graphql-request';
import { Content } from 'antd/es/layout/layout';

interface DataType {
  key:React.Key;
  no:number;
  accountName:String;
  countryName:String;
  accountOwner:String;
  lastUpdateTime:String;
  createTime:String;
  primaryContact:String;
  status:String;
}
// interface DataType {
//   name: {
//     first: string;
//     last: string;
//   };
//   gender: string;
//   email: string;
//   login: {
//     uuid: string;
//   };
// }

// interface TableParams {
//   pagination?: TablePaginationConfig;
//   sortField?: string;
//   sortOrder?: string;
//   filters?: Record<string, FilterValue>;
// }

const columns: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'no',
    width: '5%',
    fixed:'left'
  },
  {
    title: 'Account Full Name',
    dataIndex: 'accountName',
    width: '15%',
    fixed:'left'
  },
  {
    title: 'Country Code',
    dataIndex: 'countryName',
    width: '10%',
  },
  {
    title: 'Assigned to',
    dataIndex: 'accountOwner',
    render: (accountOwner) => `${accountOwner.name}`,
  },
  {
    title: 'Last Updated',
    dataIndex: 'lastUpdateTime',
  },
  {
    title: 'Created on',
    dataIndex: 'createTime',
  },
  {
    title: 'Primary Contact Email',
    dataIndex: 'primaryContact',
    render: (primaryContact) => `${primaryContact.email}`,
  },
  {
    title: 'Account Status',
    dataIndex: 'status',
  },
];
// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     sorter: true,
//     render: (name) => `${name.first} ${name.last}`,
//     width: '20%',
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       { text: 'Male', value: 'male' },
//       { text: 'Female', value: 'female' },
//     ],
//     width: '20%',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//   },
// ];

// const getRandomuserParams = (params: TableParams) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });


const Accounts: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const dataContent: DataType[] = [];
  // const obj: DataType[] = [];
  let [pagetotal,setPagetotal]=useState<number>();
  let [currentPage,setCurrentPage]=useState<number>(1);
  let [infoSize,setinfoSize]=useState<number>();
  // const [loading, setLoading] = useState(false);
  // const [tableParams, setTableParams] = useState<TableParams>({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });

  // console.log(test);
  // console.log(tData);
  
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //           // 200 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  // };

  useEffect(() => {
    // fetchData();

    //用axios實作
    // const AccData={
    //   query:`
    //   query getAcc{
    //     getAccounts(query:{tagIds:[]}){
    //       content{
    //         accountName
    //         countryName
    //         accountOwner{
    //           name
    //         }
    //         lastUpdateTime
    //         createTime
    //         primaryContact{
    //           email
    //         }
    //         status
    //       }
    //       pageInfo{
    //         totalPages
    //         totalElements
    //         numberOfElements
    //         size
    //         number
    //       }
    //     }
    //   }
    //   `
    // }
    // axios.post('http://192.168.11.226:9095/graphql',AccData,{
    //   headers:{
    //     Authorization:`Bearer ${tData}`
    //   }
    // })
    // .then(function(response){
    //   console.log(response.data.data.getAccounts.content);
    //   const info=response.data.data.getAccounts.content;
    //   setData(info);
    //   setLoading(false);
    //   setTableParams({
    //     ...tableParams,
    //     pagination:{
    //       ...tableParams.pagination,
    //       total:20,
    //     }
    //   })
    // })
    // .catch(function(response){
    //   console.error();
    // })
    //用axios實作
    
    // 用Graphql實作
    const query=(currenPg:number)=>{
      const gData=gql`
      query getAcc($params:AccountQuery){
        getAccounts(query:$params){
          content{
            accountName
            countryName
            accountOwner{
              name
            }
            lastUpdateTime
            createTime
            primaryContact{
              email
            }
            status
          }
          pageInfo{
            totalPages
            totalElements
            numberOfElements
            size
            number
          }
        }
    }
    `
      const client=new GraphQLClient('http://192.168.11.226:9095/graphql',{
        headers:{
          Authorization:`Bearer ${tData}`,
        }
      });
      var variable={
        "params": {
          "tagIds": [],
          "page": {
            "page": `${currenPg}`,
            "size": 10
          }
        }
      };
      client.request(gData,variable)
      .then(function(res:any){
        const element=res.getAccounts.pageInfo.totalElements;
        setPagetotal(element);
        const currentP=res.getAccounts.pageInfo.number;
        setCurrentPage(currentP);
        const infoSize=res.getAccounts.pageInfo.size;
        setinfoSize(infoSize);
  
        const info=res.getAccounts.content;
        for(let j=0;j<res.getAccounts.pageInfo.numberOfElements;j++){
          dataContent.push({
            key:j,
            no:j+1,
            accountName:info[j].accountName,
            countryName:info[j].countryName,
            accountOwner:info[j].accountOwner,
            lastUpdateTime:info[j].lastUpdateTime,
            createTime:info[j].createTime,
            primaryContact:info[j].primaryContact,
            status:info[j].status,
          });
        }
        // console.log(dataContent);
        setData(dataContent);
        // setLoading(false);
        // setTableParams({
        //   ...tableParams,
        //   pagination:{
        //     ...tableParams.pagination,
        //     total:page,
        //   }
        // })
      })
      .catch(console.error);
    }
    query(currentPage);
    // 用Graphql實作
  }, [currentPage]);
  // JSON.stringify(tableParams)

  
  // const handleTableChange =()=>(
  //   pagination: TablePaginationConfig,
  //   filters: Record<string, FilterValue>,
  //   sorter: SorterResult<DataType>,
  // ) => {
  //   setTableParams({
  //     pagination,
  //     filters,
  //     ...sorter,
  //   });
  
  //   // `dataSource` is useless since `pageSize` changed
  //   if (pagination.pageSize !== tableParams.pagination?.pageSize) {
  //     setData([]);
  //   }
  // };
  
  const onPagechange: PaginationProps['onChange'] =(page:number,pageSize:number|undefined)=>{
    setCurrentPage(page);
  }
  
  const showTotal: PaginationProps['showTotal'] 
  = (total,range) => `當前項目${range[0]}-${range[1]},總共${total}項`;
  return (
    <div>
        <LinkStyle to="/users">
            <Button>Users</Button>
        </LinkStyle>
        <LinkStyle to="/login">
            <Button>log out</Button>
        </LinkStyle>
        <Table
          columns={columns}
          dataSource={data}
          pagination={
            {
              pageSize:infoSize,
              total:pagetotal,
              current:currentPage,
              showTotal:showTotal,
              onChange:onPagechange
            }
          }
          scroll={{x:1500,y:500}}
        />
    </div>
  );

};






export default Accounts;