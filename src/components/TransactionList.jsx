export default function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) return <p>No transactions yet.</p>

  return (
    <ul>
      {transactions.map(t => (
        <li key={t.id}>
          <span>{t.date}</span>
          <span>{t.description}</span>
          <span>{t.category}</span>
          <span style={{ color: t.type === "income" ? "green" : "red" }}>
            {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
          </span>
          <button onClick={() => onRemove(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}