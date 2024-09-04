import React,{useState,useEffect} from 'react'
import Card from "../Card"
import axios from 'axios';
import Cookies from "js-cookie";

const IncompleteTasks = () => {
  const [tasksData,setTasksData]=useState();
  

  const jwtToken=Cookies.get('jwt_token');
  const headers={
      id:localStorage.getItem("id"),
      Authorization:`Bearer ${jwtToken}`
  }

  const fetch=async()=>{
    const response=await axios.get('https://fullstack-task-mgnt-app.onrender.com/getIncompleteTasks',{headers})
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

export default IncompleteTasks