import React from "react";
import {Routes , Route , Navigate} from 'react-router-dom'
import Login from "../Comonents/Auth/Login";
import AddCategory from "../Comonents/Categories/AddCategory";
import Categories from "../Comonents/Categories/Categories";
import Category from "../Comonents/Categories/Category";
import EditCategory from "../Comonents/Categories/EditCategory";
import Config from "../Comonents/Config/Config";
import Home from "../Comonents/Dashboard/Home";
import Products from "../Comonents/Products/Products";
import AddProduct from "../Comonents/Products/AddProduct";
import EditProduct from "../Comonents/Products/EditProduct";
import Product from "../Comonents/Products/Product";

const Router = () =>{
    let session = localStorage.getItem('token');
    return(
        <Routes>
            <Route exact path="/login" element={<Login />}/>
            <Route path="/" element={session ? <Navigate to="/categories" /> : <Login/>} />
            <Route exact path="/dashboard" element={<Home />}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/edit-product/:id" element={<EditProduct/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/add-category" element={<AddCategory/>}/>
            <Route path="/category/:id" element={<Category/>}/>
            <Route path="/edit-category/:id" element={<EditCategory/>}/>
            <Route path="/config" element={<Config/>}/>
        </Routes>
    );
}

export default Router ;