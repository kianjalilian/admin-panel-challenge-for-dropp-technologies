import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, handleRowClick }) => {
   // console.log("table : ", columns);
   return (
      <table className="table table-responsive-md table-hover">
         <TableHeader columns={columns} />
         <TableBody
            handleRowClick={handleRowClick}
            data={data}
            columns={columns}
         />
      </table>
   );
};

export default Table;
