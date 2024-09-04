import React,{useState,useEffect} from 'react';
import Card from "../Card";
import InputData from "../InputData";
import Cookies from 'js-cookie';
import axios from 'axios';

import "./index.css"

import { MdAddCircle } from "react-icons/md";


const AllTasks = () => {

    const [isModal,setModal]=useState(false)
    const [tasksData,setTasksData]=useState();
    const [updatedData,setUpdatedData]=useState({editId:'',editTask:'',editDesc:''})

    const onEditTask=(id,task,desc)=>{
      setUpdatedData({editId:id,editTask:task,editDesc:desc});
    }
    
    const onAddTask=()=>{
        setModal((prevState)=>!(prevState)) 
    }

    const changeButton=(value)=>{
      setModal(value)
    }

    const jwtToken=Cookies.get('jwt_token');
        const headers={
            id:localStorage.getItem("id"),
            Authorization:`Bearer ${jwtToken}`
        }

        const fetch=async()=>{
          const response=await axios.get('https://fullstack-task-mgnt-app.onrender.com/getAllTasks',{headers})
          setTasksData(response.data.data)
        }



        // fetching all tasks api
        useEffect(()=>{
          if(localStorage.getItem("id") && jwtToken){
            fetch();
          }
        })
    
  return (
    <>
      <div className='allTasksContainer'>
        <div className='addTaskIconContainer'>
            <button className='addTaskIconButton' type='button' onClick={onAddTask}>
                <MdAddCircle className='addIcon'/>
            </button>
        </div>
       {tasksData && (<Card isAddedCard={true}  tasksData={tasksData.tasks} setUpdatedData={setUpdatedData} onEditTask={onEditTask}/>)}   
    </div>

    {isModal && (<InputData changeButton={changeButton} updatedData={updatedData}/>)}
  
    </>
    
  )
}

export default AllTasks