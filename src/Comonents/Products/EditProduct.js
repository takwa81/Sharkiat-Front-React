import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const EditProduct = () =>{

    const [name , setName] = useState('');
    const [price, setPrice] = useState(1);
    const [description , setDescription] = useState('');
    const [is_appear_home , setIsAppearHome] = useState(1);
    const [category_id , setCategoryId] = useState(0);
    const [images , setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();
    const {http} = AuthUser() ;
    const {id} = useParams();

    const onChange = (e) => {
        console.log(e.target.files[0]);
        setImages([]);
        for (const file of e.target.files) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            // setImages((imgs) => [...imgs, file]);
            setImages(imgs=>([...imgs,{file:file,path:reader.result}]));
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }      
      };


    function loadCategories() {
        http.get("/categories").then((res) => {
            setCategories(res.data.reverse());
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        http.get(`product/${id}`).then((res) => {
            setName(res.data.name);
            setImages(res.data.images);
            setPrice(res.data.price);
            setCategoryId(res.data.category_id);
            setDescription(res.data.description);
            setIsAppearHome(res.data.is_appear_home);
        });
      }, []);


     let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }

    const editProduct= async(e)=>{
        
        let token = localStorage.getItem("token");
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("is_appear_home", is_appear_home);
        formData.append("category_id", category_id);
        formData.append("description", description);

          
        images.forEach(image=>{
            formData.append('images[]', image.file)
        });

        setLoading(true);
        try{
            const response = await axios({
                method: "post",
                url: `https://sharkiat.moe-hassan.com/api/updateProduct/${id}`,
                data: formData,
                headers: {
                     "Content-Type": "multipart/form-data",
                     "Authorization": `Bearer ${token}`,
             },
              }).then(res=>{
                swal("Success","???? ?????????? ???????????????? ??????????","success");
                navigate('/products')
              })
               .catch(error=>{
                console.log(error);
                setLoading(false)
              });

        }catch(e){
            console.log(e);
        }
       
    }
    return(

        <div>
        <Sidebar/>
        <section className="home">
            <main>
            <h2 className="text-center mt-5 mb-3 text">?????????? ???????????? ????????</h2>
            <div className="container-fluid mt-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">

                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <i className="fa fa-edit"></i> ?????????? ???????? 

                                    </div>
                                    <div className="card-block p-3 mb-5">
                                    <form onSubmit={(e) => editProduct(e)} className="form-horizontal" encType="multipart/form-data" >
                                        <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-10">
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> ?????? ???????????? </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="name" onChange={e => setName(e.target.value)} value={name}  size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label">   ?????? ????????????</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="text" name="price" onChange={e => setPrice(e.target.value)} value={price} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> ??????????</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <select
                                                        class="custom-select tm-select-accounts"
                                                        id="category"
                                                        name="category_id"
                                                        value={category_id}
                                                        onChange={e => setCategoryId(e.target.value)} 
                                                    >
                                                          {categories.map((data) => (
                                                                <>
                                                                 <option selected>??????????????????</option>
                                                                <option value={data.id}>{data.name}</option>
                                                                </>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div className="col-xl-5 col-lg-5 col-md-10 mx-auto mb-4">
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> ?????????? </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <textarea class="form-control validate" name="description"  onChange={e=>setDescription(e.target.value)} id="description" cols="30" rows="3"value={description} > 
                                                    </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                            <div class="form-group mb-3">
                                                <label >?????? ???? ???????????? ???????????????? ??</label> <br />
                                                <input  type="checkbox" name="is_appear_home" value={is_appear_home} onChange={e=>setIsAppearHome(e.target.value)} />
                                                <label for="">?????? </label>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label" for="appendedInput">?????? ????????????</label>
                                                <div className="controls">
                                                  
                                                    <div className="input-group">
                                                        <div className="custom-file mb-3">
                                                            <input className="form-control form-control-lg" onChange={onChange} name="images[]"  type="file" multiple />
                                                        
                                                                {/* {images.map((image) => (
                                                                        <img src={image} width="100" height="100" />
                                                                ))} */}
                                                                {
                                                                    images.map((data)=>(
                                                                        <img src={data.image} width="100" height="100" />
                                                                    ))
                                                                }

                                                                
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                        </div>
                                        <div className="col-12 ">
                                        <div className="form-actions">
                                                <button type="submit" className="btn btn-outline-dark btn-block fw-bold" disabled={loading}> 
                                                {loading ? (<> ?????? ?????? ?????????????????? <i className="fa fa-spinner fa-spin"></i></>) : <>?????? ??????????????????</>}
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                        </form>
                                    </div>
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
export default EditProduct ;