export interface Transaction {
  id: string
  merchant: string
  amount: number
  date: string
  icon: string
  type: "credit" | "debit"
}