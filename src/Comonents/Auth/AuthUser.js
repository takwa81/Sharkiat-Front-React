
import axios from 'axios';


export default function AuthUser(){
  let token = localStorage.getItem("token");
    const http = axios.create({
        baseURL:"https://sharkiat.moe-hassan.com/api",
        headers:{
            "X-Requested-With" : "XMLHttpRequest" ,
            'Authorization': `Bearer ${token}`,
        }
    
    });
    return {
        http
    }
}