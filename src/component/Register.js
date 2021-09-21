import axios from "axios";
import React,{useEffect, useState} from "react";

import * as yup from "yup";
import schema from "../Validation/schema";

const credentials = {
    username: '',
    password: '',
    role: ''
}

const initErrors = {
    username:'',
    password: '',
    role: ''
}
const Signup = (props) => {

    const [newUser,setNewUser] = useState(credentials);
    const [errors,setErrors] = useState(initErrors);
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
       const{name,value} = e.target; 

       yup.reach(schema,name)
       .validate(value)
       .then(()=>{
           setErrors({...errors,[name]: ''})
       })
       .catch(err => {
           setErrors({...errors,[name]:err.errors[0]})
       })

    setNewUser({...newUser,[name]:value})
    }

    const postMember = (user) =>{

        axios
        .post("https://frozen-lowlands-84790.herokuapp.com/signup",user)
        .then((res) => {
         props.history.push("/login");
        })
        .catch((err) => console.log(err.response))
    }

    const submit = (e) => {

        e.preventDefault();
        const newMember = {
            username: newUser.username.trim(),
            password: newUser.password.trim(),
            role: newUser.role
        };
        postMember(newMember);
        setNewUser(credentials);

    }

    useEffect(() => {
        schema.isValid(newUser).then((valid)=> setDisabled(!valid));
    },[newUser])

    return(
        <div className = "form-div">
            <h1>Sign Up</h1>
            <form onSubmit = {submit} className = "form-group">
                <label>
                    Username: 
                <input  
                type = "text"
                name = "username"
                placeholder="username"
                value = {newUser.username}
                onChange = {handleChange}
                />
                </label>
                <p>{errors.username}</p>
            <br/>
            <label>
                Password: 
                <input
                type = "password"
                name = "password"
                placeholder = "password"
                value = {newUser.password}
                onChange = {handleChange}
                />
                </label>
                <p>{errors.password}</p>
    <br/>
    
                <input
                type = "radio"
                id = "owner"
                name = "role"
                checked = {newUser.role === "owner"}
                value = "owner"
                onChange = {handleChange}
                />
                <label htmlFor="owner">&nbsp;Owner</label><br/>
            
                <input
                type = "radio"
                id = "buyer"
                name = "role"
                checked = {newUser.role === "buyer"}
                value = "buyer"
                onChange = {handleChange}
                />
                <label htmlFor="buyer">&nbsp;Buyer</label><br/>

                <p>{errors.role}</p>
                
                <button className='btn btn-success' disabled = {disabled}>Submit</button>
            </form>
        </div>
    )

}

export default Signup;