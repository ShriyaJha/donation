import React, {useState } from "react";
import {Link} from "react-router-dom"
import { signup, isSignedin } from "./helper/userHelper";

const SignUp =({history})=>  {

    const [values,setValues] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {firstName,lastName,email,password,error,success} = values

    const handleChange = name => events=>{
        setValues({...values, error:false, [name]: events.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        setValues({...values, error:""})
        signup({firstName,lastName,email,password}).then(data =>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        }).catch(error =>{
            console.log(error)
        });
    }

    const issignin = () =>{
        if(isSignedin()){
            return history.push("/donation")
        }
    }

    const signUp =()=>(     
        <form>
                <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                    Account Created. Click here to <Link to="/sign-in" >Login</Link>
                </div>
                <div className="alert alert-warning" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                <h3 className=" form-group ml-3">Sign Up</h3>
                <div className="form-group; w-50 p-3">
                    <label>First name</label>
                    <input type="text" className="form-control " placeholder="First name" onChange={handleChange("firstName")} value={firstName}/>
                </div>

                <div className="form-group; w-50 p-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={handleChange("lastName")} value={lastName}/>
                </div>

                <div className="form-group; w-50 p-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={handleChange("email")} value={email}/>
                </div>

                <div className="form-group; w-50 p-3">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange("password")} value={password}/>
                </div>

                <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
           
           
            </form>       
)

    return (
        <div className="box" onLoad={issignin()}>
            {signUp()}
        </div>
    );

}

export default SignUp