import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/home.css"
function Home(){
    const [isLogin,setIsLogin]=useState(true)
    return(
        <div className="home">
            <div className="auth-card">
                <h1>Expense Tracker</h1>
                <p className="hero-text">💸 Track your expenses,analyze your spending and stay in control of your finances.</p>
                <div className="auth-buttons">
                    <button className={isLogin?"active":""} onClick={()=>setIsLogin(true)}>Login</button>
                    <button className={!isLogin?"active":""} onClick={()=>setIsLogin(false)}>Register</button>
                </div>
                {isLogin?<Login/>:<Register switchToLogin={()=>setIsLogin(true)}/>}
                <p className="footer-text">
                    🔒 Secure authentication • ⚡ Fast • 📊 Easy expense management
                </p>
            </div>
        </div>
    )
}
export default Home