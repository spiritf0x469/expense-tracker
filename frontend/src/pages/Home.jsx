import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
function Home(){
    const [isLogin,setIsLogin]=useState(true)
    return(
        <div className="home">
            <div className="auth-card">
                <h1>Expense Tracker</h1>
                <div className="auth-buttons">
                    <button className={isLogin?"active":""} onClick={()=>setIsLogin(true)}>Login</button>
                    <button className={!isLogin?"active":""} onClick={()=>setIsLogin(false)}>Register</button>
                </div>
                {isLogin?<Login/>:<Register switchToLogin={()=>setIsLogin(true)}/>}
            </div>
        </div>
    )
}
export default Home