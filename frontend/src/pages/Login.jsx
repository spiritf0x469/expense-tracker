import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await api.post("/auth/login",{email,password})
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
            console.log(response.data)
        }
        catch(error){console.log(error)}
    }
    return(
        <div>
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br /><br />
                <button>Login</button>
            </form>
        </div>
    )
}
export default Login