import "../styles/navbar.css"
export default function Navbar({handleLogout}){
    return(
        <nav className="navbar">
            <h2>💸 Expense Tracker</h2>
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </nav>
    )
}