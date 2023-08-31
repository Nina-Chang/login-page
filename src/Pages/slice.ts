import {createSlice,PayloadAction} from '@reduxjs/toolkit';

type tokenGet={
    content:string;
}
const initialState:tokenGet={
    content:''
}

export const Slice=createSlice({
    name:'token',
    initialState,
    reducers:{
        getTokenFromLogin:(state,action:PayloadAction<string>)=>{
            state.content=action.payload;
            console.log(state.content);
        }
    }
})
// export const gTFLogin=(content:any)=>(state:any)=>{
//     state.token.value=content;
// }

export const {getTokenFromLogin} =Slice.actions

export const setToken=(state:any)=>state.token.content

export default Slice.reducer