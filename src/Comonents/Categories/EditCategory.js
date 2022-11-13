import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const EditCategory = () => {

    const [name , setName] = useState('');
    const [image, setImage] = useState(null);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const {http} = AuthUser() ;
    const { id } = useParams();
    let session = localStorage.getItem('token');

    useEffect(() => {
        http.get(`category/${id}`).then((res) => {
            setName(res.data.name);
            setImage(res.data.image);
        });
      }, []);


    if (!session) {
        return (<Login></Login>)
    }

    const edit = async (e) =>{
        let token = localStorage.getItem("token");
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        setLoading(true);

        try{
            const response =  await axios({
                method: "post",
                url: `https://sharkiat.moe-hassan.com/api/updateCategory/${id}`,
                data: formData,
                headers: {
                     "Content-Type": "multipart/form-data",
                     "Authorization": `Bearer ${token}`,
             },
              }).then(res=>{
                swal("Success","Category Updated Succesfully","success");
                navigate('/categories')
              });
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <Sidebar />

            <main className="home">
                <h2 className="text-center mt-5 mb-3 text">تعديل بيانات صنف  </h2>

                <div className="container-fluid mt-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">

                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <i className="fa fa-plus"></i> تعديل صنف 

                                    </div>
                                    <div className="card-block p-3">
                                    <form onSubmit={edit} className="form-horizontal" >
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
                                                            <input className="form-control form-control-lg" onChange={e=>setImage(URL.createObjectURL(e.target.files[0]))}  type="file" id="formFile" name="image" />
                                                        </div>
                                                        <br></br>
                                                       <div className="mt-1 mb-3 input-group">
                                                            <img src={image} width="150" height="150" alt={name}/>
                                                        </div>
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-actions">
                                                <button type="submit" className="btn btn-outline-dark btn-block fw-bold" disabled={loading}>
                                                {loading ? (<> يتم حفظ التعديلات <i className="fa fa-spinner fa-spin"></i></>) : <>حفظ التغييرات</>}
                                                </button>
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

export default EditCategory;