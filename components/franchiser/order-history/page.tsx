"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import CustomPagination from "@/components/CustomPagination/page";
import EditOrderHistoryModal from "@/components/modals/EditOrderHistoryModal";
import DeleteOrderHistoryModal from "@/components/modals/DeleteOrderHistoryModal";
import ReusableTable from "@/components/table/reusable-table";
import { OrderHistory } from "@/lib/franchiserStore/data";
import { useOrderHistoryStore } from "@/lib/franchiserStore/store";
import { Input } from "@/components/ui/input";
import { franchiserOrderHistoryService } from "@/services/franchiser/franchiserOrders";

const columns = [
  { key: "location", label: "LOCATION", sortable: true },
  {
    key: "orderId",
    label: "ORDER ID",
    sortable: true,
  },
  { key: "orderStatus", label: "ORDER STATUS", sortable: true },
  {
    key: "orderFulfilled",
    label: "ORDER FULFILLED",
    sortable: true,
  },
  { key: "amount", label: "AMOUNT", sortable: true },
  { key: "actions", label: "ACTIONS" },
];

const statusConfig = {
  Completed: {
    color: "success",
    variant: "solid",
    className: "bg-[#e8f5e9] text-[#4caf50]",
  },
  Pending: {
    color: "warning",
    variant: "solid",
    className: "bg-[#fff4e5] text-[#ff9800]",
  },
  Cancelled: {
    color: "danger",
    variant: "solid",
    className: "bg-[#feebec] text-[#ce292e]",
  },
  Default: {
    color: "default",
    variant: "solid",
    className: "bg-[#e0e0e0] text-[#757575]",
  },
};

export default function OrderHistoryTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    orderList,
    selectedKeys,
    editModalOrder,
    deleteModalOrder,
    locationFilter,
    statusFilter,
    page,
    sortDescriptor,
    setSelectedKeys,
    setEditModalOrder,
    setDeleteModalOrder,
    setLocationFilter,
    setStatusFilter,
    setPage,
    setSortDescriptor,
    handleSaveEdit,
    handleConfirmDelete,
    setOrderList,
  } = useOrderHistoryStore();

  const fetchOrderHistory = async () => {
    try{
      setIsLoading(true);
      const data = await franchiserOrderHistoryService.getFranchiserOrderHistory();
      setOrderList(data);
    }catch(error){
      console.error("Failed to fetch order history:", error);
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrderHistory();
  }, [fetchOrderHistory]);

  const rowsPerPage = 5;

  const handleEdit = useCallback(
    (order: OrderHistory) => {
      setEditModalOrder(order);
    },
    [setEditModalOrder],
  );

  const handleDelete = useCallback(
    (order: OrderHistory) => {
      setDeleteModalOrder(order);
    },
    [setDeleteModalOrder],
  );

  const filteredOrders = useMemo(() => {
    return orderList.filter(
      (order) =>
        order.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
        order.orderStatus.toLowerCase().includes(statusFilter.toLowerCase()),
    );
  }, [orderList, locationFilter, statusFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      const first = a["orderId"];
      const second = b["orderId"];
      return first < second ? -1 : first > second ? 1 : 0;
    });
  }, [filteredOrders]);

  const pages = Math.ceil(sortedItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedItems.slice(start, start + rowsPerPage);
  }, [page, sortedItems]);

  const renderCell = useCallback(
    (order: OrderHistory, columnKey: React.Key) => {
      switch (columnKey) {
        case "orderStatus":
          const config =
            statusConfig[order.orderStatus] || statusConfig["Default"];
          return (
            <Chip className={config.className} size="sm" color={config.color}>
              {order.orderStatus}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex space-x-2">
              <Button
                aria-label="Edit"
                onClick={() => handleEdit(order)}
                className="bg-[#e6f6eb] text-[#1e8255]"
              >
                <Pencil1Icon className="h-4 w-4" />
              </Button>
              <Button
                aria-label="Delete"
                onClick={() => handleDelete(order)}
                className="bg-[#feebec] text-[#ce292e]"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          );
        default:
          return order[columnKey as keyof OrderHistory];
      }
    },
    [handleEdit, handleDelete],
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 lg:space-x-4 mb-4 flex-wrap">
      <Input
          placeholder="Search by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <Input
          placeholder="Search by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>
      <ReusableTable
        columns={columns}
        items={items}
        selectedKeys={selectedKeys}
        handleSelectionChange={setSelectedKeys}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        renderCell={renderCell}
      />
      <EditOrderHistoryModal
        order={editModalOrder}
        onClose={() => setEditModalOrder(null)}
        onSave={handleSaveEdit}
      />
      <DeleteOrderHistoryModal
        order={deleteModalOrder}
        onClose={() => setDeleteModalOrder(null)}
        onDelete={handleConfirmDelete}
      />
      <CustomPagination
        page={page}
        pages={pages}
        rowsPerPage={rowsPerPage}
        totalItems={filteredOrders.length}
        onPageChange={setPage}
      />
    </div>
  );
}
