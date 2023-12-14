// LeaveModal.js
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React from "react";

const LeaveModal = ({ visible, onHide, selectedUser }) => {
  console.log("Selected User", selectedUser);

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={`Applied Leaves for ${selectedUser?.username}`}
      style={{ width: "50vw" }}
    >
      <DataTable
        value={selectedUser?.appliedLeaves}
        emptyMessage="No applied leaves found"
      >
        <Column field="_id" header="Leave ID" />
        <Column field="from_date" header="From Date" />
        <Column field="to_date" header="To Date" />
        <Column field="leaveType" header="Leave Type" />
      </DataTable>
    </Dialog>
  );
};

export default LeaveModal;
