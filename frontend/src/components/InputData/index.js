import React,{useEffect, useState} from 'react';
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import axios from "axios";
import "./index.css"

const InputData = (props) => {

    const {changeButton,updatedData}=props
    console.log(updatedData);

    const [modalClose,setModalClose]=useState(true)
    const [task,setTask]=useState();
    const [desc,setDesc]=useState();

    useEffect(()=>{
        setTask(updatedData.editTask);
        setDesc(updatedData.editDesc);
    },[updatedData]);

    const onChangeTask=(event)=>{
        setTask(event.target.value);
    }

    const onChangeDesc=(event)=>{
        setDesc(event.target.value);
    } 

    const onCloseModal=()=>{
        setModalClose((prevState)=>!(prevState))
        changeButton(false)
    }

    const jwtToken=Cookies.get('jwt_token');
    const headers={
        id:localStorage.getItem("id"),
        Authorization:`Bearer ${jwtToken}`
    }

    const submitData=async()=>{
         if(task==="" || desc===""){
            alert('All fields are required');
        }else{
            const response=await axios.post('https://fullstack-task-mgnt-app.onrender.com/createTask',{task,desc},{headers})
            console.log(response);
            setTask('');
            setDesc('');
            setModalClose(false);
        } 
            
    }

  return (
    <>
    {modalClose && (
        <div className='modalContainer'>
                
            <div className='inputContainer'>
                <button className='adTaskButtonClose' onClick={onCloseModal}><RxCross2 /></button>
                <input type='text' className='inputStyle1' placeholder='Task' name='title' value={task} onChange={onChangeTask}/>
                <textarea name='desc' className='inputStyle2' placeholder='Description...' cols='30' rows={10} value={desc} onChange={onChangeDesc}></textarea>
                <button className='adTaskButtonSubmit' type='button' onClick={submitData}>Submit</button>
            </div>
                
            
        </div>
    )}
        
    </>
    
  )
}

export default InputData