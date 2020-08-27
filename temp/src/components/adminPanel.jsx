import React, { Component } from "react";
import Sidebar from "../common/sidebar";
import dataService from "../services/dataService";
import ColoredCard from "../common/coloredCard";
import UserTable from "./userTable";
import Pagination from "../common/pagination";
import ResourceTable from "./resourceTable";
import { toast } from "react-toastify";

class AdminPanel extends Component {
   state = {
      userList: { data: undefined },
      resourceList: { data: undefined },
      currentPage: 1,
      showUserList: true,
   };

   async componentDidMount() {
      const { currentPage } = this.state;
      const userList = await dataService.getListUsers(currentPage);
      const resourceList = await dataService.getListResources(currentPage);
      console.log(userList);
      // console.log(resourceList);
      this.setState({ userList, resourceList });
   }

   toggleList = (list) => {
      let { showUserList } = this.state;
      if (list === "User" && showUserList) return null;
      if (list === "Resource" && !showUserList) return null;
      showUserList = !showUserList;
      const currentPage = 1;
      console.log(showUserList);
      this.setState({ showUserList, currentPage });
   };

   handleRowClick = (id) => {
      const { showUserList } = this.state;
      // console.log(id, this.props.history);
      if (showUserList) {
         this.props.history.push("/users/" + id);
      } else {
         this.props.history.push("/unknown/" + id);
      }
   };

   handlePageChange = async (page) => {
      const { showUserList } = this.state;
      const currentPage = page;
      if (showUserList) {
         const userList = await dataService.getListUsers(currentPage);
         this.setState({ currentPage, userList });
      } else {
         const resourceList = await dataService.getListResources(currentPage);
         this.setState({ currentPage, resourceList });
      }
   };

   handleUserDelete = async (user) => {
      const { userList } = this.state;
      const newUserList = { ...userList };
      const userData = newUserList.data.data;
      const newUserData = userData.filter((u) => user.id !== u.id);
      newUserList.data.data = newUserData;
      this.setState({ userList: newUserList });
      try {
         await dataService.deleteUser(user._id);
      } catch (error) {
         if (error.response && error.response.status === 404) {
            toast.error("This user has already been deleted");
         }
         this.setState({ userList });
      }
   };

   render() {
      const { userList, resourceList, showUserList, currentPage } = this.state;
      const { location, history } = this.props;
      if (userList.data === undefined) {
         return (
            <div className="row">
               <Sidebar />
            </div>
         );
      }
      const totalUsers = userList.data.total;
      const totalResources = resourceList.data.total;
      const perPage = showUserList
         ? userList.data.per_page
         : resourceList.data.per_page;
      return (
         <div className="row">
            <Sidebar onListClick={this.toggleList} />
            <div className="col-md-8">
               <div className="row">
                  <ColoredCard
                     column={12}
                     columnMedium={4}
                     background="custom-1"
                     textColor="white"
                     hasHeader={false}
                     header=""
                     title={totalUsers}
                     text="Total Users"
                     hasTitleIcon={true}
                     titleIcon={<i className="fa fa-users fa-4x ml-3"></i>}
                  />
                  <ColoredCard
                     column={12}
                     columnMedium={4}
                     background="custom-0"
                     textColor="white"
                     hasHeader={false}
                     header=""
                     title={totalResources}
                     text="Total Resources"
                     hasTitleIcon={true}
                     titleIcon={<i className="fa fa-pagelines fa-4x ml-3"></i>}
                  />
                  <ColoredCard
                     column={12}
                     columnMedium={4}
                     background="custom-2"
                     textColor="white"
                     hasHeader={false}
                     header=""
                     title={totalUsers + totalResources}
                     text="Total"
                     hasTitleIcon={true}
                     titleIcon={
                        <i className="fa fa-plus-square fa-4x ml-3"></i>
                     }
                  />
               </div>
               <div className="m-0">
                  {showUserList && (
                     <UserTable
                        location={location}
                        history={history}
                        handleRowClick={this.handleRowClick}
                        userList={userList.data.data}
                        onDelete={this.handleUserDelete}
                     />
                  )}
                  {!showUserList && (
                     <ResourceTable
                        location={location}
                        history={history}
                        handleRowClick={this.handleRowClick}
                        resourceList={resourceList.data.data}
                     />
                  )}
                  <Pagination
                     itemsCount={showUserList ? totalUsers : totalResources}
                     pageSize={perPage}
                     currentPage={currentPage}
                     onPageChange={this.handlePageChange}
                  />
               </div>
            </div>
         </div>
      );
   }
}

export default AdminPanel;
