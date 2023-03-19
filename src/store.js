import { configureStore, createSlice } from "@reduxjs/toolkit";

//1. state 보관
let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})

//2. state 등록해서 써야함
export default configureStore({
  reducer: {
    cart : cart.reducer,
  }
}) 


