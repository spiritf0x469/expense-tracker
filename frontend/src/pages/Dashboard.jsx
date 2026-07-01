import { useEffect,useState } from "react"
import api from "../services/api"
import { Navigate, useNavigate } from "react-router-dom"
import Summary from "../components/Summary"
import ExpenseList from "../components/ExpenseList"
import ExpenseForm from "../components/ExpenseForm"
import "../styles/Dashboard.css"
import Navbar from "../components/Navbar"
import Analytics from "../components/Analytics"
function Dashboard(){
    const [summary,setSummary]=useState({})
    const [recentExpenses,setRecentExpenses]=useState([])
    const [item_name,setItem_name]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [website,setWebsite]=useState("")
    const [editingId,setEditingId]=useState(null)
    const [analytics,setAnalytics]=useState(null)
    const navigate=useNavigate()
    const fetchanalytcis=async()=>{
        try{
            const analyticsresponse=await api.get("/analytics")
            setAnalytics(analyticsresponse.data)
        }
        catch(error){console.log(error)}
    }
    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/")
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            if(editingId){const response=await api.put(`/expenses/${editingId}`,{item_name,price,category,website})}
            else{const response=await api.post("/expenses/",{item_name,price,category,website})}
            fetchSummary()
            fetchRecentExpenses()
            fetchanalytcis()
            setItem_name("")
            setPrice("")
            setCategory("")
            setWebsite("")
            setEditingId(null)
        }
        catch(error){console.log(error)}
    }
    const fetchSummary=async()=>{
            try{
                const response=await api.get("/expenses/summary")
                setSummary(response.data)
                console.log(response.data)
            }
            catch(error){console.log(error)}
    }
    const fetchRecentExpenses=async()=>{
            try{
                const response=await api.get("/expenses/recent")
                setRecentExpenses(response.data)
            }
            catch(error){console.log(error)}
    }
    const handleDelete=async(id)=>{
        try{
            const response=await api.delete(`/expenses/${id}`)
            console.log(response.data)
            fetchSummary()
            fetchRecentExpenses()
            fetchanalytcis()
        }
        catch(error){console.log(error)}
    }
    const handleEdit=(expense)=>{
            setEditingId(expense.id)
            setItem_name(expense.item_name)
            setPrice(expense.price)
            setCategory(expense.category)
            setWebsite(expense.website)
    }
    useEffect(()=>{
        fetchSummary()
        fetchRecentExpenses()
        fetchanalytcis()
    },[])
    return(
        <div className="dashboard">
            <Navbar handleLogout={handleLogout}/>
            <Summary summary={summary}/>
            <div className="dashboard-content">
                <div className="left-panel">
                    {
                analytics && <Analytics data={analytics}/>
            }
            <h2 className="section-title">💳 Recent Expenses</h2>
            <ExpenseList recentExpenses={recentExpenses}
            handleEdit={handleEdit}
            handleDelete={handleDelete}/>
                </div>
                <div className="right-panel">
                <ExpenseForm handleSubmit={handleSubmit}
            item_name={item_name}price={price}category={category}website={website}editingId={editingId}
            setItem_name={setItem_name}setPrice={setPrice}setCategory={setCategory}setWebsite={setWebsite}/>
                </div>
            </div>
        </div>
    )
}
export default Dashboard