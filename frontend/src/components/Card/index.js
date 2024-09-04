import React, { useState } from 'react'
import {CiHeart,CiEdit} from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import InputData from "../InputData"
import "./index.css"
import axios from 'axios';
import Cookies from "js-cookie"

const Card = (props) => {
 
    const {isAddedCard,tasksData, /*setUpdatedData,*/ onEditTask}=props

    const [isOpenTaskCardModal,setIsOpenTaskCardModal]=useState(false)

    const greenColor='bg-green'
    const redColor='bg-red'

     
    const onAddTaskCard=()=>{
        setIsOpenTaskCardModal(prevState=>!prevState)
    }
   
    const changeButton=(value)=>{
        setIsOpenTaskCardModal(value)
    }

    const jwtToken=Cookies.get('jwt_token');
    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${jwtToken}`
    }


    //update complete task api
    const handleCompleteTask=async(id)=>{
        try {
            await axios.put(`https://fullstack-task-mgnt-app.onrender.com/updateCompleteTask/${id}`,{},{headers});
        } catch (error) {
            console.log(error)
        }
    }
    
    //update important task api
    const handleImportant=async(id)=>{
        try {
           const response= await axios.put(`https://fullstack-task-mgnt-app.onrender.com/updateImportantTask/${id}`,{},{headers});
           console.log(response);
        } catch (error) {
            console.log(error)
        }
    }
     
    //delete task Api
    const deleteTask=async(id)=>{
        try {
            const response=await axios.delete(`https://fullstack-task-mgnt-app.onrender.com/deleteTask/${id}`,{headers})
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    //updating or editing task and passing id,task,desc parameters to update the task
    const handleUpdate=async(id,task,desc)=>{
        setIsOpenTaskCardModal(true);
        //setUpdatedData({id:id,task:task,desc:desc});
        onEditTask(id,task,desc);
    }

  return (
    <div className='taskCardContainer'>
         {tasksData.map((eachItem)=>( 
            <div className='taskCard' key={eachItem._id}>
                <div >
                    <h3>{eachItem.task}</h3>
                    <p>{eachItem.desc}</p>
                </div>
                <div className='card-icons-container'>
                    <button className={`${eachItem.complete===true ? greenColor:redColor } button`} onClick={()=>handleCompleteTask(eachItem._id)}>{eachItem.complete===true? "Completed":"In Complete"}</button>
                    <div className='card-icons'>
                        <button className='editableIcons' onClick={()=>handleImportant(eachItem._id)}>
                            {eachItem.important===false? <CiHeart/> : <FaHeart className='redHeartIcon'/> }
                        </button>
                        {isAddedCard !== false && (<button className='editableIcons' onClick={()=>handleUpdate(eachItem._id,eachItem.task,eachItem.desc)}>
                            <CiEdit />
                        </button>)}
                        
                        <button className='editableIcons' onClick={()=>deleteTask(eachItem._id)}>
                            <MdDeleteOutline/>
                        </button>
                    </div>
                </div>
            </div>
         ))} 

         {
            isAddedCard===true && (<button className='addTaskCard' onClick={onAddTaskCard} >
                <MdAddCircle className='addIcon'/>
                <h2 className='add'>Add Task</h2>
            </button>)
        } 

        {isOpenTaskCardModal &&  (<InputData  changeButton={changeButton}/>)}

        
        
    </div>
  )
}

export default Card