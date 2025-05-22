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
import { fetchAuctionTransactions } from "@/api/transactions";

export default function TransactionHistory({ stockId }) {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["auction-transactions", stockId],
    queryFn: () => fetchAuctionTransactions(stockId),
  });

  if (isLoading) {
    return <div className="p-4">Loading transactions…</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Transaction History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Stock Id</TableHead>
            <TableHead>Transaction Id</TableHead>
            <TableHead>Transaction Invoice Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Totol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.transactions?.map((tx, idx) => (
            <TableRow key={tx.Transaction_Id ?? idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{tx.Transaction_Id}</TableCell>
              <TableCell>{tx.Transaction_Invoice_Id}</TableCell>
              <TableCell>{tx.Stock_Id}</TableCell>
              <TableCell>{tx.Amount}</TableCell>
              <TableCell>{tx.Credit_Debit}</TableCell>
              <TableCell>{tx.Car.Agency}</TableCell>
              <TableCell>{tx.Transaction_Date}</TableCell>
            </TableRow>
          ))}
          {transactions?.transactions?.length === 0 && stockId ? (
            <TableRow>
              <TableCell colSpan={5}>No transactions found.</TableCell>
            </TableRow>
          ) : transactions?.transactions?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No transactions found.</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="taxt-Center">Grand Total</TableCell>
              <TableCell>{transactions?.total}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
