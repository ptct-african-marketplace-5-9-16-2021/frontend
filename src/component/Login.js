
import React, { useState } from 'react';


function Login() {
    const [details, setDetails] = useState({
        username: '',
        password:''
    })

    const changeHandler = (e) => {
        setDetails({...details,[e.target.name]:e.target.value})
        }

    const submitHandler = e => {
        e.preventDefault();
        Login(details)
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
                        value = {details.username}
                    />
                    <br/>
                    <br/>
                <label htmlFor = 'password'>Password: </label>
                    <input 
                        type = 'password' 
                        name = 'password' 
                        id = 'password' 
                        onChange = {changeHandler} 
                        value = {details.password}
                    />
                    <br/>
                    <br/>
                <button className = "button submit">Login</button>
            </form>
                {/* <p>{(error !== '') ? ( <div className = 'error' style = {{ color:'red' }}>{error}</div> ) : '' } </p> */}
        </div>
    )
    
}

export default Login;