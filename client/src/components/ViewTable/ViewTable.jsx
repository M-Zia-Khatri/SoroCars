import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar, updateCar } from "@/API/cars";
import { Button } from "../ui/button";

export default function ViewTable({ data, saleType, THColumns }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateCar(id, payload),
    onSuccess: () => {
      setEditingId(null);
      setEditData({});
      queryClient.invalidateQueries(["cars"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (it) => {
    setEditingId(it.Stock_Id);
    setEditData({
      Stock_Id: it.Stock_Id,
      Invoice_Id: it.Invoice_Id,
      Adjustment: Number(it.Adjustment),
      Amount: Number(it.Amount),
      Status: it.Status,
      Sale_type: it.Sale_type,
      Agency: it.Agency,
      User_Id: it.User_Id,
      AgentName: it.AgentName,
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]:
        e.target.name === "Adjustment" || e.target.name === "Amount"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSave = () => {
    console.log(editData);
    updateMutation.mutate({ id: editingId, payload: editData });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">
        Car Details of <span className="capitalize">{saleType}</span>
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            {THColumns.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {saleType === "Stock Invoice" && data?.cars?.length > 0 ? (
            <>
              {data.cars.map((item, index) => (
                <TableRow key={item.id ?? index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.Stock_Id ?? "-"}</TableCell>
                  <TableCell>{item?.Invoice_Id ?? "-"}</TableCell>
                  <TableCell>{item?.Status ?? "-"}</TableCell>
                  <TableCell>{item?.Adjustment ?? "-"}</TableCell>
                  <TableCell>{item?.Amount ?? "-"}</TableCell>
                  <TableCell>{item?.Total ?? "-"}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={THColumns.length - 2}
                  className="text-center text-muted-foreground"
                >
                  Grand Total
                </TableCell>
                <TableCell>{data?.totalAdjustmentInPKR ?? "-"}</TableCell>
                <TableCell>{data?.totalAmount ?? "-"}</TableCell>

                <TableCell>{data?.grandTotal ?? "-"}</TableCell>
              </TableRow>
            </>
          ) : data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id ?? index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editingId === item.Stock_Id ? (
                    <input
                      name="AgentName"
                      value={editData.AgentName}
                      onChange={handleChange}
                    />
                  ) : (
                    item.AgentName
                  )}
                </TableCell>
                <TableCell>{item?.Invoice_Id ?? "-"}</TableCell>
                <TableCell>{item?.Stock_Id ?? "-"}</TableCell>
                <TableCell>
                  {editingId === item.Stock_Id ? (
                    <input
                      name="Adjustment"
                      value={editData.Adjustment}
                      onChange={handleChange}
                    />
                  ) : (
                    item.Adjustment
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.Stock_Id ? (
                    <input
                      name="Amount"
                      value={editData.Amount}
                      onChange={handleChange}
                    />
                  ) : (
                    item.Amount
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.Stock_Id ? (
                    <input
                      name="Status"
                      value={editData.Status}
                      onChange={handleChange}
                    />
                  ) : (
                    item.Status
                  )}
                </TableCell>
                <TableCell>{item?.Sale_type ?? "-"}</TableCell>
                <TableCell>{item?.Agency ?? "-"}</TableCell>
                {item?.Sale_type === "Stock" && (
                  <TableCell>
                    {editingId === item?.Stock_Id ? (
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
                        <Button onClick={() => handleEdit(item)}>Edit</Button>
                        <Button
                          onClick={() => handleDelete(item.Stock_Id)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={THColumns.length + 1}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
