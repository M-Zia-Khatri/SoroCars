// components/AuctionTransaction/TransactionHistory.jsx

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAuctionTransactions,
  deleteAuctionTransaction,
  updateAuctionTransaction,
} from "@/API/transactions";
import { Button } from "../ui/button";

export default function TransactionHistory({ stockId }) {
  const [editingId, setEditingId] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["auction-transactions", stockId],
    queryFn: () => fetchAuctionTransactions(stockId),
    retry: false,
    cacheTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAuctionTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["auction-transactions", stockId]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateAuctionTransaction(id, payload),
    onSuccess: () => {
      setEditingId(null);
      setEditData({});
      queryClient.invalidateQueries(["auction-transactions", stockId]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (tx) => {
    setEditingId(tx.Transaction_Id);
    setEditData({
      Transaction_Id: tx.Transaction_Id,
      Transaction_Invoice_Id: tx.Transaction_Invoice_Id,
      Stock_Id: tx.Stock_Id,
      Credit_Debit: tx.Credit_Debit,
      Amount: tx.Amount,
      Sender: tx.Sender,
      Receiver: tx.Receiver,
      Partner: tx.Partner,
      Transaction_Date: tx.Transaction_Date.split("T")[0],
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateMutation.mutate({ id: editingId, payload: editData });
  };

  if (isLoading) {
    return <div className="p-4">Loading transactions…</div>;
  }

  if (!data || !data.Response || !data.Response.transactions) {
    return <div className="p-4">No transactions found.</div>;
  }

  const {
    Response: { transactions, total = 0 },
  } = data;

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Transaction History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Stock Id</TableHead>
            <TableHead>Transaction Id</TableHead>
            <TableHead>Invoice No</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Sender / Receiver</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.length > 0 ? (
            <>
              {transactions.map((tx, idx) => (
                <TableRow key={tx.Transaction_Id ?? idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <input
                        name="Stock_Id"
                        value={editData.Stock_Id}
                        onChange={handleChange}
                      />
                    ) : (
                      tx.Stock_Id
                    )}
                  </TableCell>
                  <TableCell>{tx.Transaction_Id}</TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <input
                        name="Transaction_Invoice_Id"
                        value={editData.Transaction_Invoice_Id}
                        onChange={handleChange}
                      />
                    ) : (
                      tx.Transaction_Invoice_Id
                    )}
                  </TableCell>
                  <TableCell className={`text-center ${tx.Credit_Debit === "Credit" ? "text-green-500" : "text-red-500"}`}>
                    {editingId === tx.Transaction_Id ? (
                      <select
                        name="Credit_Debit"
                        value={editData.Credit_Debit}
                        onChange={handleChange}
                      >
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                      </select>
                    ) : (
                      tx.Credit_Debit
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <input
                        name="Amount"
                        type="number"
                        value={editData.Amount}
                        onChange={handleChange}
                      />
                    ) : (
                      tx.Amount
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <>
                        <input
                          name="Sender"
                          value={editData.Sender}
                          onChange={handleChange}
                          style={{ width: "45%" }}
                        />
                        {" / "}
                        <input
                          name="Receiver"
                          value={editData.Receiver}
                          onChange={handleChange}
                          style={{ width: "45%" }}
                        />
                      </>
                    ) : (
                      <>
                        {tx.Sender} / {tx.Receiver}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <input
                        name="Partner"
                        value={editData.Partner}
                        onChange={handleChange}
                      />
                    ) : (
                      tx.Partner
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <input
                        name="Transaction_Date"
                        type="date"
                        value={editData.Transaction_Date}
                        onChange={handleChange}
                      />
                    ) : (
                      tx.Transaction_Date.split("T")[0]
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === tx.Transaction_Id ? (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={updateMutation.isLoading}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            setEditData({});
                          }}
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(tx)}>Edit</Button>
                        <Button
                          onClick={() => handleDelete(tx.Transaction_Id)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {/* Grand Total Row */}
              <TableRow>
                <TableCell colSpan={8} className="text-center font-semibold">
                  Grand Total
                </TableCell>
                <TableCell colSpan={2}>{total}</TableCell>
              </TableRow>
            </>
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
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
