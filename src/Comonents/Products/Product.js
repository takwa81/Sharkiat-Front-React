import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const Product = () => {
    
    const { http } = AuthUser();
    const {id} = useParams() ;

    const [product , setProduct] = useState([]);
    const [loading , setLoading] = useState(false);
    let componentMounted = true;
    
    const loadProduct = async() =>{
        setLoading(true);
        await http.get(`product/${id}`).then((res) => {

            if (componentMounted) {
                setProduct(res.data);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        });
    }
    useEffect(() => {
       loadProduct();
      }, []);
      console.log(product);

     
    let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }
    

    const Loading = () =>{
        return(
          <>
          <center><div className="text-primary fs-5"><i className="fa fa-spinner fa-spin fs-5"></i></div></center>
          </>
        );
      }

    return (
        <div>
            <Sidebar />

            <main className="home">
                <h2 className="text-center mt-5 mb-3 text">المنتجات </h2>
             
                {product && (
                <>
                    <div className="container-fluid ml-5">
                        <div className="row align-item-right">
                            <div className="col-sm-4">
                                <Link to="/products" className="btn btn-primary btn-block fw-bold ">
                                     <i className="fa fa-light fa-right-from-bracket ml-3 "></i> 
                                          كافة المنتجات
                                </Link>
                            </div>
                        </div>
                    </div>
                    < div className="container mt-5 mb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10">
                            {loading ? <Loading></Loading> : 
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-6">
                                            {product.images ? 
                                            // <div className="images p-3">
                                            // <div className="text-center p-4"> <img id="main-image" src={product.images[0].image} width="250" /> </div>
                                            //     <div className="thumbnail text-center">
                                            //         {product.images.map((data,i) =>
                                            //          <img src={data.image} width="70" />
                                            //          )}
                                            //      </div>
                                            // </div>
                                            <div className="images p-3">
                                               <div className="container-fluid">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-6">
                                                    {product.images.map((data,i) =>
                                                     <img src={data.image} width="200" />
                                                     )}
                                                    </div>
                                                </div>
                                               </div>
                                            </div>
                                            : <div></div>}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="product p-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                </div>
                                                <div className="mt-4 mb-3"> <span className="text-uppercase text-muted brand">{product.categoryName}</span>
                                                    <h5 className="text-uppercase">{product.name}</h5>
                                                    <p className="lead">
                                                        {product.description}
                                                    </p>
                                                    <div className="price">
                                                        <br></br>
                                                      
                                                        { product.price ?
                                                        (<div>
                                                          <span className="font-weight-bold"> السعر : </span>
                                                          <span className="act-price">${product.price}</span>
                                                        </div>) : <div></div> }
                                                           <br></br>
                                                      
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </>
                )}

            </main>

        </div>
    );

}

export default Product;