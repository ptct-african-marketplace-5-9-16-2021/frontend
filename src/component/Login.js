import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const initialValues  = {
    username: '',
    password: ''
}


function Login(props) {
    const [loginValues,setLoginValues] = useState(initialValues);

    const changeHandler = (e) => {
        setLoginValues({...loginValues,[e.target.name]:e.target.value})
    }

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
    
        axios
            .post("https://frozen-lowlands-84790.herokuapp.com/api/auth/login",
            `grant_type=password&username=${loginValues.username}&password=${loginValues.password}`,
            {
                headers: {
              Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
              "Content-Type": "application/x-www-form-urlencoded" 
                }
            })
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
                axiosWithAuth()
                .get("/getroleinfo")
                .then(res => {
                    
                    if(res.data === "owner")
                    {
                    props.history.push("/owner")
                    }
                    else if(res.data === "buyer")
                    {
                    props.history.push("/buyer")
        }
                })
                .catch(err => {
                    console.log(err.response)
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    
    }
 


    return (
        <div className = 'form-div'>
            <h1>Login</h1>
            <form onSubmit = {submitHandler} className="form-group">
                <label htmlFor ='username'>Username: </label>
                    <input 
                        type = 'username' 
                        name = 'username' 
                        id = 'username' 
                        onChange = {changeHandler} 
                        value = {loginValues.username}
                    />
                    <br/>
                    <br/>
                <label htmlFor = 'password'>Password: </label>
                    <input 
                        type = 'password' 
                        name = 'password' 
                        id = 'password' 
                        onChange = {changeHandler} 
                        value = {loginValues.password}
                    />
                    <br/>
                    
                <button className = "button submit">Login</button>
                <br/><br/>
                <Link to = "/signup">Create account</Link>
            </form>
                {/* <p>{(error !== '') ? ( <div className = 'error' style = {{ color:'red' }}>{error}</div> ) : '' } </p> */}
        </div>
    )
    
}

export default Login;