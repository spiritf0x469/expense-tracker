function ExpenseList({recentExpenses,handleEdit,handleDelete}){
    return(
    <div>
        {
            recentExpenses.map((expense)=>(
                <div className="expense-card" key={expense.id}>
                    <div className="expense-info">
                        <h3>{expense.item_name}</h3>
                        <p>₹{expense.price}</p>
                    </div>
                    <div className="expense-buttons">
                        <button className="edit-btn" onClick={()=>handleEdit(expense)}>Edit</button><button className="delete-btn" onClick={()=>handleDelete(expense.id)}>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
    )
}
export default ExpenseList