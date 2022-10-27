import React , {useState } from 'react';
import './Login.css';
import imageFile from './logo.png';
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Login = (e) => {
    
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errorList, setErrorList]= useState([]);
    const navigate = useNavigate();
    function login(e){
    const {http} = AuthUser();

        e.preventDefault() ;
        //Send Api Request to validate data and get token 
        const data = {
            email: email, 
            password: password ,
        }

        http.post('/login',data ).then((res)=>{
            if(res.data.status === 200){
                console.log(res.data);
                localStorage.setItem('token',res.data.token);
                swal("Success",res.data.message,"success");
                if(res.data.role === '1')
                {
                   navigate('/dashboard') ;
                } else{
                    swal("Warning",'You Should Admin Role',"warning")
                }
            }
            else if(res.data.status === 401)
            {
                swal("Warning",res.data.message,"warning");
            }
            else
            {
                setErrorList({errorList: res.data.validation_errors });
            }
    
        })
        .catch(error=>{
            alert("Error Service");
        })
        

       
    }
    return (
        <div className="wrapper">
            <div className="logo">
                <img src={imageFile} alt=""/>
            </div>
            <div className="text-center mt-4 name">
                Admin Login
            </div>
            <form className="p-3 mt-3" >
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-envelope"></span>
                    <input type="email" name="email" id="email" placeholder="Email" value={email} 
                    onChange={e => setEmail(e.target.value)} required/>
                 <span className="text-danger">{errorList.email}</span>

               
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fa fa-key"></span>
                    <input type="password" name="password" id="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required/>
                <span className="text-danger">{errorList.password}</span>

                </div>
                <button className="btn mt-3" onClick={login}>Login</button>
            </form>
            
        </div>
    );
}
export default Login;