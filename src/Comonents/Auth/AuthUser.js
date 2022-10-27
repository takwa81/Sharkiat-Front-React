
import axios from 'axios';


export default function AuthUser(){
  let token = localStorage.getItem("token");
    const http = axios.create({
        baseURL:"http://localhost:8000/api",
        headers:{
            "Content-type" : "application/json",
            "X-Requested-With" : "XMLHttpRequest" ,
            'Authorization': `Bearer ${token}`,
        }
    
    });
    return {
        http
    }
}