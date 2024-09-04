import React, { useEffect,useState } from 'react'
import {CgNotes} from "react-icons/cg"
import {MdLabelImportant} from "react-icons/md"
import {FaCheckDouble} from "react-icons/fa6"
import { TbNotebook } from "react-icons/tb";
import {Link,useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import "./index.css"

const Sidebar = () => {

    const [sideBarData,setSideBarData]=useState('');
    const data=[
        {
            title:"All tasks",
            icon:<CgNotes/>,
            link:"/"
        },
        {
            title:"Important tasks",
            icon:<MdLabelImportant/>,
            link:"/importantTasks"
        },
        {
            title:"Completed tasks",
            icon:<FaCheckDouble/>,
            link:"/completedTasks"
        },
        {
            title:"Incomplete tasks",
            icon:<TbNotebook />,
            link:"/incompleteTasks"
        },
    ]

    const navigate=useNavigate()

    const logoutButton=()=>{
      localStorage.clear();
      Cookies.remove('jwt_token');
      navigate('/signup') 
    }

    const jwtToken=Cookies.get('jwt_token');
    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${jwtToken}`
    }

    const fetch=async()=>{
      const response=await axios.get('http://localhost:4001/getAllTasks',{headers})
      setSideBarData(response.data.data)
    }

    useEffect(()=>{
        if(localStorage.getItem("id") && jwtToken){
            fetch();
          }
    })

  return (
    <div className='sideContainer'>
        {sideBarData && (
                <div>
                    <h2 className='sideUSer'>{sideBarData.username}</h2>
                    <h4 className='sideEmail'>{sideBarData.email}</h4>
                    <hr className='line'/>
            </div>
        )}
        <div className='sideItemsContainer'>
            {data.map((item,i)=>(
                <Link to={item.link} key={i} className='sideItems'>{item.icon} {item.title}</Link>
            ))}
        </div>
        <div><button className='bg-gray-600 w-full logoutButton' onClick={logoutButton}>Log Out</button></div>
    </div>
  )
}

export default Sidebar