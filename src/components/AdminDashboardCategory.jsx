import React, { useState } from "react";
import CreateCategory from "./CreateCategory";

const AdminDashboardCategory = () => {
  const [showCreate, setShowCreate] = useState(true);
  return (
    <div className="w-11/12 mx-auto p-6 rounded bg-white border">
      {!showCreate && <></>}
      {showCreate && <CreateCategory setShowCreate={setShowCreate} />}
    </div>
  );
};

export default AdminDashboardCategory;
