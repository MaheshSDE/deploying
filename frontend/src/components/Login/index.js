import {useState,useEffect} from "react"
import { Link} from "react-router-dom"
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"
import { validateEmail } from "../../utils/helper"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"

import "./index.css"



const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState('')
    const [isPasswordShowInput,setPasswordShowInput]=useState(false)
    const [error,setMessage]=useState("")

    const navigate=useNavigate()

    
     const onSubmitSuccess=(jwtToken)=>{
           Cookies.set('jwt_token',jwtToken,{expires:30})
           navigate('/')
    }

    /* const onSubmitFailure=(errorMessage)=>{
        setMessage(errorMessage)
    } */
 
     useEffect(()=>{
        const jwtToken=Cookies.get('jwt_token');
        if(jwtToken!==undefined){
           return navigate('/')
        }
    }) 


    const handleLogin=async(event)=>{
        event.preventDefault()

            if(!validateEmail(email)){
                setMessage("Please, enter a valid email.")
                return;
            }

            if(!password){
                setMessage("please, enter a password");
                return;
            }

            setMessage("")

            //Login Api Call

             const loginDetails={
                email,
                password
            }
            const url='https://fullstack-task-mgnt-app.onrender.com/login';
            const options={
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    Accept:'application/json',
                },
                body: JSON.stringify(loginDetails),
            }

            const response=await fetch(url,options)
            const data=await response.json()
            console.log(data)

            if(response.ok===true){
                localStorage.setItem("id",data.id);
                localStorage.setItem("jwtToken",data.jwt_token);
                onSubmitSuccess(data.jwt_token);
            }else{
                alert(data.message);
            }

            setEmail('')
            setPassword('')

    }

    const onChangeEmailInput=(event)=>{
        setEmail(event.target.value)
    }

    const onChangePasswordInput=(event)=>{
        setPassword(event.target.value)
    } 

    const onClickIcon=()=>{
        setPasswordShowInput(!isPasswordShowInput)
    }
    
    return(
        <div className="login-bg-container">
            {/* <NavBar/> */}
            <div className='loginContainer'>
                <div className="form-container">
                    <form onSubmit={handleLogin} >
                        <h4 className="heading4">Login</h4>

                        <label htmlFor="email" className="labelInput">Email<span className="star">*</span></label>
                        <input id="email" type="text" placeholder="Email" value={email} onChange={onChangeEmailInput} className="input-style"/>

                        <label htmlFor="password" className="labelInput">Password<span className="star">*</span></label>
                        <div className="passwordContainer">
                        <input id="password" type={isPasswordShowInput?"text":"Password"} value={password} onChange={onChangePasswordInput} placeholder="Password" className="input-style2"/>
                        {isPasswordShowInput?<FaRegEye size={22} onClick={onClickIcon} className="eyeIcon"/>:<FaRegEyeSlash size={22} onClick={onClickIcon} className="eyeIcon"/>}
                        </div>
                        <p className="error-message">{error}</p>
                        <button type="submit" className="login-button">Login</button>

                        <p className="loginPara">
                            Not registered yet?
                            <Link to='/signup' className='font-medium text-primary underline ml-2 link'>
                              Create an Account
                            </Link>
                        </p>

                        
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login