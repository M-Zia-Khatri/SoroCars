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
    data,
    isLoading,
  } = useQuery({
    queryKey: ["auction-transactions", stockId],
    queryFn: () => fetchAuctionTransactions(stockId),
    retry: false,
    cacheTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <div className="p-4">Loading transactions…</div>;
  }

  const { Response:{transactions, total = 0} } = data

  console.log(transactions);
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
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.length > 0 ? (
            <>
              {transactions.map((tx, idx) => (
                <TableRow key={tx.Transaction_Id ?? idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{tx.Transaction_Id}</TableCell>
                  <TableCell>{tx.Transaction_Invoice_Id}</TableCell>
                  <TableCell>{tx.Stock_Id}</TableCell>
                  <TableCell>{tx.Amount}</TableCell>
                  <TableCell>{tx.Credit_Debit}</TableCell>
                  <TableCell>{tx.Car.Agency}</TableCell>
                  <TableCell>{tx.Transaction_Date.split("T")[0]}</TableCell>
                </TableRow>
              ))}

              {/* Grand Total Row */}
              <TableRow>
                <TableCell colSpan={7} className="text-right font-semibold">
                  Grand Total
                </TableCell>
                <TableCell>{total}</TableCell>
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
