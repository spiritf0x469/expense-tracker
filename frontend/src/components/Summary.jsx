function Summary({summary}){
    return(
        <div className="summary">
            {/* <h2>Summary</h2> */}
            <div className="card">
                <h3>Total Spent</h3>
                <p>{summary.total_spent}</p>
            </div>
            <div className="card">
                <h3>Total Expenses</h3>
                <p>{summary.total_expenses}</p>
            </div>
            <div className="card">
                <h3>Average Expense</h3>
                <p>{summary.average_expense}</p>
            </div>
        </div>
    )
}
export default Summary