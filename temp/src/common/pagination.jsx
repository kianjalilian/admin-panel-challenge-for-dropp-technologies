import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
   const pagesCount = Math.ceil(itemsCount / pageSize);
   if (pagesCount === 1) return null;
   const pages = _.range(1, pagesCount + 1);

   return (
      <nav className="text-center">
         <ul className="pagination pagination-sm justify-content-center">
            {pages.map((page) => (
               <li
                  key={page}
                  className={
                     page === currentPage ? "page-item active" : "page-item"
                  }
               >
                  <button
                     onClick={() => onPageChange(page)}
                     className="page-link"
                  >
                     {page}
                  </button>
               </li>
            ))}
         </ul>
      </nav>
   );
};

Pagination.propTypes = {
   itemsCount: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
   currentPage: PropTypes.number.isRequired,
};

export default Pagination;
