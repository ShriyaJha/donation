import React, { useState } from "react";
import { Link , Redirect} from "react-router-dom";
import { authenticate, isAuthenticated, signin, isSignedin } from "./helper/userHelper";

const Login =({history})=>{

    const [values, setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        reDirect:false
    })
    const {email,password,error,loading, reDirect} = values

    const handleChange = name => events=>{
        setValues({...values, error:false, [name]: events.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        setValues({...values, error:false})
        signin({email,password}).then(data =>{
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error,})
            }
            else{
                authenticate(data, () =>{
                    
                    setValues({
                        email:"",
                        password:"",
                        error:"",
                        loading:true,
                        reDirect:true
                    })
                })
            }
        }).catch(error => {
            setValues({...values,error:error,})
        })

    }

    const ReDirect = ()=>{
        if (reDirect){
            return history.push("/donation")
        }
    }

    //checking if user already signed in
    const issignin = () =>{
        if(isSignedin()){
            return history.push("/donation")
        }
    }

        const login = () =>(
                <form>
                <div className="alert alert-warning" style={{display: error ? "" : "none"}}>
                    {error}
                </div>
                    <h3 className=" form-group ml-3">Sign In</h3> 

                    <div className="form-group; w-50 p-3">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={handleChange("email")} value={email}/>
                    </div>

                    <div className="form-group; w-50 p-3">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange("password")} value={password}/>
                    </div>

                    <div className="form-group; w-50 p-3">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" onClick={onSubmit} className="btn btn-primary btn-block">Submit</button>
                    
                </form>
            
        )

    return (
        <div className="box" onLoad={issignin()}>
            {login()}
            {ReDirect()}
        </div>        
    );

}

export default Login;