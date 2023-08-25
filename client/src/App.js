import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Login, Home, Public, FAQ, Services, Blogs, DetailProduct, Products, FinalRegister} from './pages/public';
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import {useDispatch} from 'react-redux';


function App() {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getCategories())
  }, [])
  return (
    <div className="min-h-screen  font-main">
      <Routes>
        <Route path = {path.PUBLIC} element={<Public />}>
            <Route path ={path.HOME} element ={<Home />}/>
            <Route path ={path.BLOGS} element ={<Blogs />}/>
            <Route path ={path.DETAIL_PRODUCT__PID__TITLE} element ={<DetailProduct />}/>
            <Route path ={path.FAQ} element ={<FAQ />}/>
            <Route path ={path.OUR_SERVICES} element ={<Services />}/>
            <Route path ={path.PRODUCTS} element ={<Products />}/>
        </Route>
        <Route path ={path.LOGIN} element ={<Login />}/>
        <Route path ={path.FINAL_REGISTER} element ={<FinalRegister />}/>
      </Routes>
    </div>
  );
}

export default App;
