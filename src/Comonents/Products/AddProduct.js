import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const AddProduct = () =>{

    const [name , setName] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [quantity , setQuantity] = useState(0);
    const [description , setDescription] = useState('');
    const [is_appear_home , setIsAppearHome] = useState(0);
    const [category_id , setCategoryId] = useState(0);
    const [expire_date , setExpireDate] = useState(new Date().toJSON());

    const [images , setImages] = useState([]);

   
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const { http } = AuthUser();
  
    const onChange = (e) => {
        for (const file of e.target.files) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            setImages((imgs) => [...imgs, reader.result]);
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
        }

        // setImages(e.target.files);
        // console.log(images);

            // const newArray = images.map((item, i) => {
            //   if (index === i) {
            //     return { ...item, [e.target.image]: e.target.files };
            //   } else {
            //     return item;
            //   }
            // });
            // setImages(newArray);
      };

      console.log(images, images.length)

    function loadCategories() {
        http.get("/categories").then((res) => {
            setCategories(res.data.reverse());
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    let session = localStorage.getItem('token');
    if (!session) {
        return (<Login></Login>)
    }

    function addProduct(e){
        let token = localStorage.getItem("token");
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("discount", discount);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("is_appear_home", is_appear_home);
        formData.append("category_id", category_id);
        formData.append("expire_date", expire_date);

          
            for (let i = 0; i < images.length; i++) {
                formData.append('images[]',JSON.stringify(images[i]));                      
            }
          
        // images.forEach(image=>{
        //     formData.append('images[]', image)
        // });

       

        const response =  axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/product",
            data: formData,
            headers: {
                 "Content-Type": "multipart/form-data",
                 "Authorization": `Bearer ${token}`,
         },
          }).then(res=>{
            console.log(res.data);
            swal("Success","Products Added Succesfully","success");
            navigate('/products')
          });
       
        
    }


  

    return(
        <div>
        <Sidebar />

        <main className="home">
            <h2 className="text-center mt-5 mb-3 text">إضافة منتج جديد </h2>
            <div className="container-fluid mt-5">
                    <div className="row justify-content-center">
                        <div className="">

                            <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                                <div className="card">
                                    <div className="card-header">
                                    <i className="fa fa-plus"></i>  إضافة منتج 

                                    </div>
                                    <div className="card-block p-3 mb-5">
                                    <form onSubmit={(e) => addProduct(e)} className="form-horizontal" encType="multipart/form-data" >
                                        <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-10">
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> اسم المنتج </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="name" onChange={e => setName(e.target.value)} value={name}  size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label">   سعر المنتج</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="text" name="price" onChange={e => setPrice(e.target.value)} value={price} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> معدل الحسم</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="discount" onChange={e => setDiscount(e.target.value)} value={discount} placeholder="%"  size="16" type="number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label">  تاريخ انتهاء الحسم</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="expire_date" onChange={e => setExpireDate(e.target.value)} value={expire_date} size="16" type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> عدد المنتجات</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="number" name="quantity" onChange={e => setQuantity(e.target.value)} value={quantity}  />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> الصنف</label>
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
                                                                 <option selected>اخترالصنف</option>
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
                                                <label className="form-control-label"> الوصف </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <textarea class="form-control validate" name="address" id="address" cols="30" rows="3"value={description} onChange={e=>setDescription(e.target.value)} > 
                                                              
                                                    </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                            <div class="form-group mb-3">
                                                <label for="description">عرض في الصفحة الرئيسية ؟</label> <br />
                                                <input  type="checkbox" name="is_appear_home" value={is_appear_home} onChange={e=>setIsAppearHome(e.target.value)} />
                                                <label for="">عرض </label>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label" for="appendedInput">صور المنتج</label>
                                                <div className="controls">
                                                  
                                                    <div className="input-group">
                                                        <div className="custom-file mb-3">
                                                            <input className="form-control form-control-lg" onChange={onChange} name="images[]"  type="file" multiple />
                                                        
                                                                {images.map((link) => (
                                                                        <img src={link} width="100" height="100" />
                                                                ))}
                                                                
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                          
                                        </div>
                                        <div className="col-12 ">
                                        <div className="form-actions">
                                                <button type="submit" className="btn btn-outline-dark btn-block fw-bold"> إضافة</button>
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

    </div>
    );

}
export default AddProduct ;