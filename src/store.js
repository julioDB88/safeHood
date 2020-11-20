import { configureStore,combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice';
import groupReducer from './reducers/groupSlice';
import searchGroups from './reducers/searchGroupsSlice'
import authSlice from './reducers/authSlice'
import alertsSlice from './reducers/alertsSlice'
import requestsSlice from './reducers/joinRequestsSlice'
import membersSlice from './reducers/membersSlice'

const combinedReducers = combineReducers({
  group:groupReducer,
  user:userReducer,
  searchGroup:searchGroups,
  auth:authSlice,
  alerts:alertsSlice,
  petitions:requestsSlice,
  members:membersSlice
});

const rootReducer= (state,action)=>{
  if (action.type === 'user/logout') { 
     state = undefined;
  }
  return combinedReducers(state,action);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck: false})]
})
 
 export default store;