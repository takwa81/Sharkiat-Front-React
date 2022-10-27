import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";


const Category = () => {


    const { http } = AuthUser();
    const {id} = useParams() ;
    const [category , setCategory] = useState([]);
    useEffect(() => {
        http.get(`category/${id}`).then((res) => {
            setCategory(res.data);
        });
      }, []);
      console.log(category);

    let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }
    return (
        <div>
            <Sidebar />
            
                <main className="home">
                    <h2 className="text-center mt-5 mb-3 text">الأصناف </h2>
                    {category && (
                   <>
                    <div className="container-fluid ml-5">
                        <div className="row align-item-right">
                          <div className="col-sm-4">
                            <Link to="/categories" className="btn btn-primary btn-block fw-bold "> <i className="fa fa-light fa-right-from-bracket ml-3 "></i>  كافة الاصناف</Link>
                          </div>
                        </div>
                      </div>
                    <div className="container-fluid">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-6 mb-5">
                            <h2 className="mb-3 text">{category.name}</h2>
                            <img src={category.image} className="rounded-circle" width="250" height="250"/>
                            </div>
                            <br></br>
                            {/* <h2 className="mb-3 text">منتجات هذا الصنف  </h2> */}

                        </div>
                        
                    </div>
                   </>
                    )}

                </main>
       
        </div>
    );

}

export default Category;