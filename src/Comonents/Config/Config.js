import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AuthUser from "../Auth/AuthUser";
import Login from "../Auth/Login";
import Sidebar from "../Dashboard/Sidebar";

const Config = () =>{
    const [address , setAddress] = useState('');
    const [telephone , setTelephone] = useState('');
    const [phone , setPhone] = useState('');
    const [whatsapp , setWhatsapp] = useState('');
    const [instagram , setInstagram] = useState('');
    const [facebook , setFacebook] = useState('');
    const [twitter , setTwitter] = useState('');
    const [close , setClose] = useState('');
    const [open , setOpen] = useState('');
    const [ads , setAds] = useState('');
    const [loading , setLoading] = useState(false);
    const {http} = AuthUser();
    const navigate = useNavigate();
    useEffect(() => {
        http.get('config').then((res) => {
            setAddress(res.data.address);
            setTelephone(res.data.telephone);
            setPhone(res.data.phone);
            setWhatsapp(res.data.whatsapp);
            setInstagram(res.data.instagram);
            setFacebook(res.data.facebook);
            setTwitter(res.data.twitter);
            setClose(res.data.close);
            setOpen(res.data.open);
            setAds(res.data.ads);
        });
      }, []);

    let session = localStorage.getItem('token');
    if(!session){
       return(<Login></Login>)
    }

    const updateConfig = async (e) =>{
        let token = localStorage.getItem("token");
        e.preventDefault();

        const data = {
            address: address ,
            telephone: telephone ,
            phone: phone ,
            ads: ads ,
            open: open ,
            close:close,
            twitter: twitter ,
            facebook: facebook ,
            instagram: instagram,
            whatsapp: whatsapp,
        };

        setLoading(true);
        try{
            const response = await axios({
                method: "put",
                url: 'https://sharkiat.moe-hassan.com/api/config',
                data: data,
                headers: {
                     "Content-type" : "application/json",
                     "X-Requested-With" : "XMLHttpRequest" ,
                     "Authorization": `Bearer ${token}`,
             },
              }).then(res=>{
                swal("Success","تم حفظ التعدبلات بنجاح","success");
                navigate('/config')
              });    

        }
        catch(e){
            console.log(e);
        }
        
    }

    return(
        <div>
        <Sidebar/>
        <section className="home">
            <main>
            <h2 className="text-center mt-5 mb-3 text">إعدادات المتجر</h2>
            
            <div className="container-fluid mt-5">
                    <div className="row justify-content-center">
                        <div className="">

                            <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                                <div className="card">
                                    <div className="card-header">
                                    <i class="fas fa-table"></i> إعدادات التطبيق 

                                    </div>
                                    <div className="card-block p-3 mb-5">
                                    <form onSubmit={updateConfig} className="form-horizontal" >
                                        <div className="row">
                                        <div className="col-xl-5 col-lg-5 col-md-10">
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fas fa-mobile-alt me-2"></i>  رقم الموبايل</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="phone" value={phone} onChange={e => setPhone(e.target.value)} size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fas fa-phone me-2"></i> رقم الهاتف الأرضي</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="text" name="telephone" value={telephone} onChange={e => setTelephone(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fab fa-whatsapp me-2"></i> واتساب</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fab fa-facebook-f me-2"></i> فيسبوك</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control" name="facebook" value={facebook} onChange={e => setFacebook(e.target.value)} size="16" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fab fa-instagram me-2"></i> انستغرام</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="text" name="instagram" value={instagram} onChange={e => setInstagram(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fab fa-twitter me-2"></i> تويتر</label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                        <input id="prependedInput" className="form-control"  size="16" type="text" name="twitter" value={twitter} onChange={e => setTwitter(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-5 col-lg-5 col-md-10 mb-4">
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fas fa-map-marker-alt me-2"></i> العنوان </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <textarea class="form-control validate" name="address" value={address} id="address" cols="30" rows="3" onChange={e => setAddress(e.target.value)}> 
                                                        {address}       
                                                    </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="fas fa-ad"></i> إضافة إعلان </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <textarea class="form-control validate" name="address" id="address" cols="30" value={ads} rows="3" onChange={e => setAds(e.target.value)}>        
                                                        {ads}
                                                    </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>ساعات العمل </h4>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"><i class="far fa-clock"></i> يفتح في </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <input value={open} onChange={e => setOpen(e.target.value)} type="time" id="open" name="open" class="form-control validate" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="form-control-label"> <i class="far fa-clock"></i> يغلق في  </label>
                                                <div className="controls">
                                                    <div className="input-prepend input-group">
                                                    <input value={close} onChange={e => setClose(e.target.value)} type="time" id="open" name="open" class="form-control validate" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 ">
                                        <div className="form-actions">
                                                <button type="submit" className="btn btn-outline-dark btn-block fw-bold">
                                                {loading ? (<> يتم حفظ التعديلات <i className="fa fa-spinner fa-spin"></i></>) : <>حفظ التغييرات</>}
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

export default Config ;