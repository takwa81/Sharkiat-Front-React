import React from "react";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const Products = () =>{

    let session = localStorage.getItem('token');
    if(!session){
       return(<Login></Login>)
    }
    return(
        <div>
        <Sidebar/>
        <section className="home">
            <main>
            <h2 className="text-center mt-5 mb-3 text">المنتجات</h2>
            <div className="container-fluid ml-5">
                <div className="row align-item-right">
                    <div className="col-sm-4">
                    <Link to="/add-product" className="btn btn-primary btn-block fw-bold "><i class="fa fa-plus"></i> إضافة منتج جديد</Link>
                    </div>
                </div>
            </div>

            <div className="container-fluid ml-5">
                <div className="row justify-content-center text-center">
                
                <div className="col-lg-3 mt-5 mb-2">
                <div class="card" >
                    <img class="card-img-top" src="" height="190px" alt="Product image "/>
                    <div class="card-body">
                    <h5 class="card-title2">Test</h5>
                    </div>
                    <div className="card-footer">
                    <Link class="text-warning m-1" to=""> <i class="fas fa-2x fa-edit"></i> </Link>  
                    <Link class="text-success m-1"  to=""> <i class="fas fa-2x fa-eye"></i> </Link>  
                    <Link class="text-danger m-1" to="" > <i class="fas fa-2x fa-trash"></i> </Link>  
                    </div>
                </div>
                </div>
               
                </div>
            </div>
            </main>
        </section>
        </div>
    );
}

export default Products;