import { useState, useEffect } from "react"
import { getTransactions, addTransaction, editTransaction, deleteTransaction } from "../utils/storage"

export default function useTransactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    setTransactions(getTransactions())
  }, [])

  function add(transaction) {
    const updated = addTransaction(transaction)
    setTransactions(updated)
  }

  function edit(transaction) {
    const updated = editTransaction(transaction)
    setTransactions(updated)
  }

  function remove(id) {
    const updated = deleteTransaction(id)
    setTransactions(updated)
  }

  return { transactions, add, edit, remove }
}