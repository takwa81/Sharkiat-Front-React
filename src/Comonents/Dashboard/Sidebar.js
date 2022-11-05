import React, { useEffect, useState } from "react";
import {Link , useNavigate} from "react-router-dom" ;
import swal from 'sweetalert';

const Sidebar = () =>{
    const [isExpanded, setExpendState] = useState(false);
    const [theme, setTheme] = useState(false);

    useEffect(()=>{
        if(theme === true){
            document.body.classList.add("dark")
        }
        else{
            document.body.classList.remove("dark")
        }
    });

    const handleTheme = () =>{
        setTheme(!theme)
    }

    const navigate = useNavigate();
       
    
    const logout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
        swal("Success","Successfully logged out","success");
    }

    
    const menuItems = [
		{
			text: "لوحة التحكم",
			icon: "fas fa-tachometer-alt icon",
            to: "/dashboard"
		},
		{
			text: "الأصناف",
			icon: "fa fa-solid fa-bag-shopping icon",
            to: "/categories"
		},
		{
			text: "المنتجات",
			icon: "fas fa-shopping-cart icon",
            to: "/products"
		},
		{
			text: "الإعدادات",
			icon: "fas fa-cog icon",
            to: "/config"
		}
	];

    return(
        // <nav className="sidebar close">
        <nav className={
            isExpanded
                ? "sidebar"
                : "sidebar close"
        }>
        <header>
            <div className="image-text">
                <span className="image">
                </span>

                
                {isExpanded && (
						<div className="sidebar-heading text-center text text-uppercase border-bottom">
                            <span className="name">شرقيات</span>
                            <span className="profession">متجر الكتروني</span>
                        </div>
					)}
            </div>

            <div className="" onClick={() => setExpendState(!isExpanded)}><i className='bx bx-chevron-right toggle'></i></div>
        </header>

        <div className="menu-bar">
            <div className="menu">
                <ul className="menu-links">
                {menuItems.map(({ index ,text, icon , to}) => (
                    <li className="nav-link" key={index}>
                        <Link to={to}>
                            <i className={icon} ></i>
                            <span className="text nav-text">{text}</span>
                        </Link>
                    </li>
                    ))}
                    <li className="nav-link">
                        <Link to="/login" onClick={logout}>
                            <i className="fa fa-light fa-right-from-bracket icon"></i>
                            <span className="text nav-text">خروج</span>
                        </Link>
                    </li>
                   

                </ul>
            </div>

            <div className="bottom-content">

                <li className="mode">
                    <div className="sun-moon">
                        <i className='bx bx-moon icon moon'></i>
                        <i className='bx bx-sun icon sun'></i>
                    </div>
                    <span className="mode-text text">{theme ? "الوضع المظلم" : "الوضع الفاتح"}</span>

                    <div onClick={handleTheme} className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
                
            </div>
        </div>

    </nav>
    );
}
export default Sidebar;