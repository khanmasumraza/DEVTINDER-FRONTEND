import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";
import requestreducer from "./requestSlice";

const appStore=configureStore({
  reducer:{
    user:userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestreducer,
  },
})

export default appStore;