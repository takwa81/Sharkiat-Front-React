import React, { useEffect, useState } from "react";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

const Categories = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { http } = AuthUser();
  let componentMounted = true;

  const  loadCategories = async () => {
    setLoading(true);
    await http.get("/categories").then((res) => {
        if (componentMounted) {
          setCategories(res.data.reverse());
          setLoading(false);
      }
      return () => {
          componentMounted = false;
      }
    });
}



    useEffect(() => {
        loadCategories();
    }, []);

    function deleteCategory(id) {
      http.delete(`/category/${id}`).then(loadCategories());
    
    }

    let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }
    return (
        <div>
            <Sidebar />
            
                <main className="home">
                    <h2 className="text-center mt-5 mb-3 text">الأصناف </h2>

                      <div className="container-fluid ml-5">
                        <div className="row align-item-right">
                          <div className="col-sm-4">
                            <Link to="/add-category" className="btn btn-primary btn-block fw-bold "><i class="fa fa-plus"></i> إضافة صنف جديد</Link>
                          </div>
                        </div>
                      </div>
                      
                        <div className="container-fluid ml-5">
                          <div className="row justify-content-center text-center">
                            {loading ? <div><h5>جار تحميل الأصناف ....</h5></div> : 
                            <>
                          {categories.map((data, index) => (
                            <div className="col-lg-3 mt-5 mb-2">
                            <div class="card" >
                              <img class="card-img-top" src={data.image} height="190px" alt="Card image cap"/>
                              <div class="card-body">
                                <h5 class="card-title2">{data.name}</h5>
                                </div>
                                <div className="card-footer">
                                <Link class="text-warning m-1" to={`/edit-category/${data.id}`}> <i class="fas fa-2x fa-edit"></i> </Link>  
                                <Link class="text-success m-1"  to={`/category/${data.id}`}> <i class="fas fa-2x fa-eye"></i> </Link>  
                                <Link class="text-danger m-1" to="" onClick={() => deleteCategory(data.id)}> <i class="fas fa-2x fa-trash"></i> </Link>  
                              </div>
                            </div>
                            </div>
                          ))}
                              </>}
                          </div>

                        </div>
                      
                </main>
       
        </div>
    );

}

export default Categories;