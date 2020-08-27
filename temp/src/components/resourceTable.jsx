import React, { Component } from "react";
import Table from "../common/table";
// import { Link } from "react-router-dom";

class ResourceTable extends Component {
   columns = [
      { path: "id", label: "Id" },
      { path: "name", label: "Name" },
      { path: "year", label: "Year" },
      { path: "color", label: "Color" },
      { path: "pantone_value", label: "Pantone" },
   ];

   render() {
      const { resourceList, handleRowClick } = this.props;
      // console.log("userTable : ", this.columns);

      return (
         <Table
            data={resourceList}
            handleRowClick={handleRowClick}
            // onSort={onSort}
            // sortColumn={sortColumn}
            columns={this.columns}
         />
      );
   }
}

export default ResourceTable;
