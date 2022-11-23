import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";
import NoData from '../Dashboard/image/nodata.png';

const Products = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadded , setLoadded] = useState(false);
    let componentMounted = true;
    const { http } = AuthUser();

    const loadProducts = async () => {
        setLoading(true);
       await http.get("/products").then((res) => {
            
            if (componentMounted) {
                setProducts(res.data.reverse());
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    function deleteProduct(id) {
        http.delete(`/product/${id}`).then(loadProducts());
      
      }


      const imageLoaded = () =>{
        setLoadded(true);
      }

    let session = localStorage.getItem('token');
    if(!session){
       return(<Login></Login>)
    }

    const Loading = () =>{
        return(
          <>
          <center><div className="text-primary fs-5"><i className="fa fa-spinner fa-spin"></i></div></center>
          </>
        );
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
                {loading ? <Loading></Loading> : 
                (!products ? <> <center><img id="blah" src={NoData} height="450" alt="NoData"/></center></> :
                 <>
                {products.map((data, index) => (
                <div className="col-lg-3 mt-5 mb-2">
                <div class="card" >
                    <img class="card-img-top" src={data.images[0].image} onLoad={imageLoaded} height="200" alt="Product image "/>
                    {!loadded && <center><i className="fa fa-spinner fa-spin"></i></center>}
                    <div class="card-body">
                    <h5 class="card-title2">{data.name}</h5>
                    <p>{data.description.substring(0,30)}</p>
                    <div class="stats mt-2">
                        <div class="d-flex justify-content-center p-price"><span className="text-danger text-bold">{data.price}$</span> </div>
                    </div>
                    </div>
                    <div className="card-footer">
                    <Link class="text-warning m-1" to={`/edit-product/${data.id}`}> <i class="fa fa-2x fa-edit"></i> </Link>  
                    <Link class="text-success m-1"  to={`/product/${data.id}`}> <i class="fa fa-2x fa-eye"></i> </Link>  
                    <Link class="text-danger m-1" to=""  onClick={() => deleteProduct(data.id)}> <i class="fa fa-2x fa-trash"></i> </Link>  
                    </div>
                </div>
                </div>
                ))}
                 </>
                 )}
                </div>
            </div>
            </main>
        </section>
        </div>
    );
}

export default Products;