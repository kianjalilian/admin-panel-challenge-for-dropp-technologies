import React, { Component } from "react";
import Table from "../common/table";

class UserTable extends Component {
   columns = [
      {
         path: "email",
         label: "Email",
      },
      { path: "id", label: "Id" },
      { path: "first_name", label: "First name" },
      { path: "last_name", label: "Last name" },
      {
         path: "avatar",
         label: "Image",
         content: (info) => (
            <img
               src={info.avatar}
               alt="userImage"
               className="w-md-50 h-auto img-thumbnail"
            />
         ),
      },
      {
         key: "edit",
         label: "Edit",
         content: (info) => (
            <button
               // onClick={() => this.props.onDelete(info)}
               className="btn btn-secondary z-index-top"
               onClick={() => this.handleEdit(info.id)}
            >
               Edit
            </button>
         ),
      },
      {
         key: "delete",
         label: "Delete",
         content: (info) => (
            <button
               // onClick={() => this.props.onDelete(info)}
               className="btn btn-danger"
               onClick={() => this.props.onDelete(info)}
            >
               Delete
            </button>
         ),
      },
   ];

   handleEdit = (id) => {
      console.log("pushing history");
      this.props.history.push("/users/edit/" + id);
   };

   render() {
      const { userList, handleRowClick } = this.props;
      // console.log("userTable : ", this.columns);

      return (
         <Table
            data={userList}
            handleRowClick={handleRowClick}
            // onSort={onSort}
            // sortColumn={sortColumn}
            columns={this.columns}
         />
      );
   }
}

export default UserTable;
