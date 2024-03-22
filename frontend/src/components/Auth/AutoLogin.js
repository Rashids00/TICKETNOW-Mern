import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage,setAdminFromLocalStorage } from "../Store/authSlice";

function AutoLogin(props){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setUserFromLocalStorage());
        dispatch(setAdminFromLocalStorage());
    
    },[]);
    return props.children
}

export default AutoLogin; 