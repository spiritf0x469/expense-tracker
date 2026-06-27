import { useState } from "react"
import api from "../services/api"
function Register({switchToLogin}){
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await api.post("/auth/register",{username,email,password})
            alert("Registration successful! Please login")
            switchToLogin()
        }
        catch(error){console.log(error)}
    }
    return(
        <form action="" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Register</button>
        </form>
    )
}
export default Register