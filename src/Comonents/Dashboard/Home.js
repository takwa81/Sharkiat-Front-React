import React from "react";
import './style.css';
import File from './image/14.jpg'
import Sidebar from "./Sidebar";
import Login from "../Auth/Login";

const Home = ()=>{
    let session = localStorage.getItem('token');
    if(!session){
       return(<Login></Login>)
    }
    return(
        <div>
        <Sidebar/>
        <section className="home">
            <main>
            <h2 className="text-center mt-5 mb-3 text">لوحة التحكم</h2>
            <center><img id="blah" src={File} height="450" alt="Dashboard image"/></center>
            </main>
        </section>
        </div>
    );
}

export default Home ;