import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const AddCategory = () => {

    const [name , setName] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }

    function addCategory(e){
        let token = localStorage.getItem("token");
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);

        const response =  axios({
            method: "post",
            url: "https://sharkiat.moe-hassan.com/api/category",
            data: formData,
            headers: {
                 "Content-Type": "multipart/form-data",
                 "Authorization": `Bearer ${token}`,
         },
          }).then(res=>{
            swal("Success","Category Added Succesfully","success");
            navigate('/categories')
          });
       
        
    }

    return (
        <div>
            <Sidebar />

            <main className="home">
                <h2 className="text-center mt-5 mb-3 text">إضافة صنف جديد </h2>

                <div className="container-fluid mt-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">

                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <i className="fa fa-plus"></i> إضافة صنف 

                                    </div>
                                    <div className="card-block p-3">
                                    <form onSubmit={addCategory} className="form-horizontal" >
                                            <div className="form-group">
                                                <label className="form-control-label" for="prependedInput">الاسم</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  onChange={e => setName(e.target.value)} value={name} size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label" for="appendedInput">الصورة</label>
                                                <div className="controls">
                                                  
                                                    <div className="input-group">
                                                        <div className="custom-file mb-3">
                                                            <input className="form-control form-control-lg" onChange={e=>setImage(e.target.files[0])}  type="file" id="formFile" name="image" />
                                                        </div>
                                                        <br></br>
                                                        {image && (<div className="mt-1 mb-3 input-group">
                                                            <img src={URL.createObjectURL(image)} width="150" height="150"/>
                                                        </div>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-outline-dark btn-block fw-bold">إضافة</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default AddCategory;