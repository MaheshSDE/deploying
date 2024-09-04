import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Cookies from "js-cookie";
import Card from "../Card"

const ImportantTasks = () => {
  const [tasksData,setTasksData]=useState()

  //const dataLength=tasksData.length

  const jwtToken=Cookies.get('jwt_token');
  const headers={
      id:localStorage.getItem("id"),
      Authorization:`Bearer ${jwtToken}`
  }

  const fetch=async()=>{
    const response=await axios.get('https://fullstack-task-mgnt-app.onrender.com/getImportantTasks',{headers})
    console.log(response);
    setTasksData(response.data.data)
  }

   console.log(tasksData)
  useEffect(()=>{
      fetch();
  })

  return (
    <div>
     {tasksData && <Card isAddedCard={false} tasksData={tasksData}/>} 
    </div>
  )
}

export default ImportantTasks