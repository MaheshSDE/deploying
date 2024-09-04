import React, {useEffect} from "react";
import Sidebar  from '../Sidebar'
import {Outlet,useNavigate} from "react-router-dom"
import Cookies from 'js-cookie'

import "./index.css"

const Home=()=>{

    const navigate=useNavigate()

   useEffect(()=>{
    const jwtToken=Cookies.get('jwt_token');
    if(jwtToken===undefined){
        return navigate('/login');
    }
   })
    

    return(
        <div className="homeContainer">
            <div className="sideBarContainer">
                <Sidebar/>
            </div>
            <div className="taskMainContainer">
                <Outlet/>
            </div>
        </div>
    )
}
export default Home