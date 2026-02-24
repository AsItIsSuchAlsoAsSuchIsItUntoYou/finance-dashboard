export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const net = income - expenses

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div>
        <h3>Income</h3>
        <p style={{ color: "green" }}>${income.toFixed(2)}</p>
      </div>
      <div>
        <h3>Expenses</h3>
        <p style={{ color: "red" }}>${expenses.toFixed(2)}</p>
      </div>
      <div>
        <h3>Net</h3>
        <p style={{ color: net >= 0 ? "green" : "red" }}>${net.toFixed(2)}</p>
      </div>
    </div>
  )
}