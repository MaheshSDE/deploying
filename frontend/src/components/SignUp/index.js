import { useState,useEffect } from "react"
import Cookies from "js-cookie"
import {validateEmail} from "../../utils/helper"
import {Link} from "react-router-dom"
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"


import "./index.css"

const SignUp=()=>{

    const [username,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [isPasswordShowInput,setPasswordShowInput]=useState(false)
    const [error,setMessage]=useState("")

    const navigate=useNavigate() 


    useEffect(()=>{
        const jwtToken=Cookies.get('jwt_token');
        if(jwtToken!==undefined){
            return navigate('/');
        }
    })

    
    const onChangeNameInput=(event)=>{
        setName(event.target.value)
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

    const onSubmitSuccess=(errorMessage)=>{
        setMessage(errorMessage)
    }
 
    /* const onSubmitFailure=(errorMessage)=>{
        setMessage(errorMessage)
    } */

    const handleSignUp=async (event)=>{
        event.preventDefault()

        if(!username){
            setMessage("Please enter the username.")
            return;
        }

        if(!validateEmail(email)){
            setMessage("Please, enter a valid email.")
            return;
        }

        if(!password){
            setMessage("please, enter a password");
            return;
        }

        setMessage("")

        const userDetails={
            username,
            email,
            password,
        }
        
        
        const url='https://fullstack-task-mgnt-app.onrender.com/signup';
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(userDetails),
          }

          const response=await fetch(url,options)
          console.log(response)
          const data=await response.json()
          if(response.ok===true){
            onSubmitSuccess(data.message);
            navigate('/login');
          }
          else{
           /*  onSubmitFailure(data.message) */
            alert(data.message);
          }

          setName("")
          setEmail("")
          setPassword("") 
    }

    return(
        <div className="login-bg-container">
            
            <div className='loginContainerSignup'>
                <div className="form-container-signup">
                    <form onSubmit={handleSignUp} >
                        <h4 className="heading4">SignUp</h4>

                        <label htmlFor="name" className="labelInput">Username*</label>
                        <input id="name" type="text" placeholder="Name" value={username} onChange={onChangeNameInput} className="input-style"/>

                        <label htmlFor="email" className="labelInput">Email*</label>
                        <input id="email" type="text" placeholder="Email" value={email} onChange={onChangeEmailInput} className="input-style"/>

                        <label htmlFor="password" className="labelInput">Password*</label>
                        <div className="passwordContainer">
                        <input id="password" type={isPasswordShowInput?"text":"Password"} value={password} onChange={onChangePasswordInput} placeholder="Password" className="input-style2"/>
                        {isPasswordShowInput?<FaRegEye size={22} onClick={onClickIcon} className="eyeIcon"/>:<FaRegEyeSlash size={22} onClick={onClickIcon} className="eyeIcon"/>}
                        </div>
                        <p className="error-message">{error}</p>

                        <button type="submit" className="login-button">Create Account</button>

                        <p className="loginPara">
                            Already have account?
                            <Link to='/login' className='link text-primary underline'>
                              Login
                            </Link>
                        </p>

                    </form>
                </div> 
            </div> 
        </div> 
    )
}
export default SignUp