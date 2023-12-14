// UserTable.js
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";
import LeaveModal from "./LeaveModal"; // Create a LeaveModal component

const UserTable = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);

  const showLeaveModal = (user) => {
    setSelectedUser(user);
    setLeaveModalVisible(true);
  };

  const leaveTemplate = (rowData) => (
    <Button icon="pi pi-ellipsis-h" onClick={() => showLeaveModal(rowData)} />
  );

  return (
    <div>
      <DataTable value={users}>
        <Column field="username" header="Username" />
        <Column field="department" header="Department" />
        <Column field="casualLeaves" header="Casual Leave Left" />
        <Column field="sickLeaves" header="Sick Leave Left" />
        <Column
          body={leaveTemplate}
          header=""
          style={{ textAlign: "center" }}
        />
      </DataTable>

      {leaveModalVisible && (
        <LeaveModal
          visible={leaveModalVisible}
          onHide={() => setLeaveModalVisible(false)}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserTable;
