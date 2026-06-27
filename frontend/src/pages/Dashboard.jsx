import { useEffect,useState } from "react"
import api from "../services/api"
import { Navigate, useNavigate } from "react-router-dom"
function Dashboard(){
    const [summary,setSummary]=useState({})
    const [recentExpenses,setRecentExpenses]=useState([])
    const [item_name,setItem_name]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [website,setWebsite]=useState("")
    const [editingId,setEditingId]=useState(null)
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem("token")
        navigate("/")
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const token=localStorage.getItem("token")
            if(editingId){const response=await api.put(`/expenses/${editingId}`,{item_name,price,category,website},{headers:{Authorization:`Bearer ${token}`}})}
            else{const response=await api.post("/expenses/",{item_name,price,category,website},{headers:{Authorization:`Bearer ${token}`}})}
            fetchSummary()
            fetchRecentExpenses()
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
                const token=localStorage.getItem("token")
                const response=await api.get("/expenses/summary",{headers:{Authorization:`Bearer ${token}`}})
                setSummary(response.data)
                console.log(response.data)
            }
            catch(error){console.log(error)}
    }
    const fetchRecentExpenses=async()=>{
            try{
                const token=localStorage.getItem("token")
                const response=await api.get("/expenses/recent",{headers:{Authorization:`Bearer ${token}`}})
                setRecentExpenses(response.data)
            }
            catch(error){console.log(error)}
    }
    const handleDelete=async(id)=>{
        const token=localStorage.getItem("token")
        try{
            const response=await api.delete(`/expenses/${id}`,{headers:{Authorization:`Bearer ${token}`}})
            console.log(response.data)
            fetchSummary()
            fetchRecentExpenses()
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
    },[])
    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Summary</h2>
            <h3>Total Spent: {summary.total_spent}</h3>
            <h3>Total Expenses: {summary.total_expenses}</h3>
            <h3>Average Expense: {summary.average_expense}</h3>
            <h2>Recent Expense</h2>
            {
                recentExpenses.map((expense)=>(
                    <div key={expense.id}>
                        <p>{expense.item_name}</p>
                        <p>₹{expense.price}</p>
                        <button onClick={()=>handleEdit(expense)}>Edit</button><button onClick={()=>handleDelete(expense.id)}>Delete</button>
                    </div>
                ))
            }
            <h2>{editingId?"Edit Expense":"Add Expense"}</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Item Name" value={item_name} onChange={(e)=>setItem_name(e.target.value)}/><br />
                <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/><br />
                <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}/><br />
                <input type="text" placeholder="Website" value={website} onChange={(e)=>setWebsite(e.target.value)}/><br /><br />
                <button type="submit">{editingId?"Update":"Add"}</button>
            </form><br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default Dashboard