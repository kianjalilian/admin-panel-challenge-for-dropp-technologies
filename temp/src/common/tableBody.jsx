import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
   renderCell = (item, column) => {
      if (column.content) return column.content(item);

      return _.get(item, column.path);
   };

   createKey = (item, column) => {
      return item._id + (column.path || column.key);
   };

   handleOnClick = (column, item) => {
      const { handleRowClick } = this.props;
      console.log("in handle on click");
      if (column.label !== "Edit" && column.label !== "Delete") {
         return handleRowClick(item.id);
      } else {
         return null;
      }
   };

   render() {
      const { data, columns } = this.props;
      return (
         <tbody>
            {data.map((item) => (
               <tr className="clickable" key={item.id}>
                  {columns.map((column) => (
                     <td
                        onClick={() => this.handleOnClick(column, item)}
                        className="align-middle"
                        key={this.createKey(item, column)}
                     >
                        {this.renderCell(item, column)}
                     </td>
                  ))}
               </tr>
            ))}
         </tbody>
      );
   }
}

export default TableBody;
