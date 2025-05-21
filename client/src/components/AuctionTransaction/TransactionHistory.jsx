// components/AuctionTransaction/TransactionHistory.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAuctionTransactions } from "@/API/transactions";

export default function TransactionHistory({ stockId }) {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auction-transactions", stockId],
    queryFn: () => fetchAuctionTransactions(stockId),
  });

  if (isLoading) {
    return <div className="p-4">Loading transactions…</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (transactions.length === 0 && stockId) {
    return <div className="p-4 text-gray-600">404: No transactions found.</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Transaction History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Stock Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, idx) => (
            <TableRow key={tx.Transaction_Id ?? idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tx.Stock_Id}</TableCell>
              <TableCell>{tx.Amount}</TableCell>
              <TableCell>{tx.Credit_Debit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
