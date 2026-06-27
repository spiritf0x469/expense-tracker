function ExpenseForm({handleSubmit,item_name,price,category,website,editingId,setItem_name,setPrice,setCategory,setWebsite}){
    return(
    <div className="form-card">
        <h2>{editingId?"Edit Expense":"Add Expense"}</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Item Name" value={item_name} onChange={(e)=>setItem_name(e.target.value)}/><br />
                <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/><br />
                <input type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}/><br />
                <input type="text" placeholder="Website" value={website} onChange={(e)=>setWebsite(e.target.value)}/><br /><br />
                <button type="submit">{editingId?"Update":"Add"}</button>
            </form><br />
    </div>
    )
}
export default ExpenseForm