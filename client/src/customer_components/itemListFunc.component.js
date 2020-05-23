import React, { Component } from "react";
import ItemListComponent from "./itemList.component";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Link} from "react-router-dom";




export default function ItemListFunc(props) {


    return (
       <div>

           <h2>{props.pager}</h2>


           {/*<div className="card text-center m-3">
               <h3 className="card-header font-weight-bold">Clothing List</h3>
               <NotificationContainer />
               <div className="card-body ">
                   {props.pageOfItems.map(item =>

                       <div key={item._id}>
                           <div className="container rounded-0 border border-info ">

                               <div className="container ">
                                   <div className="row">
                                       <div className="col-sm">
                                           <br/>
                                           <img height="80%" width="100%" src=""/>
                                           <br/>
                                       </div>
                                       <div className="col-sm">
                                           <br/><br/><br/>
                                           <h5 className="font-weight-bold text-center">{item.product_name}</h5>
                                           <h4 className="font-weight-bold text-center text-danger">Price : Rs {item.product_price}.00</h4>
                                           <h5 className="font-weight-bold text-center text-danger">Discount : Rs {item.product_discount}.00</h5>
                                           <br/><br/>
                                       </div>
                                       <div className="col-sm">
                                           <br/><br/>
                                           <Link to={"/view/" +item._id}  className="nav-link"> <button className="btn btn-success"> View This Item </button></Link>
                                           {this.props.isAuthenticated ?
                                               <Link to={'/'}  className="nav-link"> <button className="btn btn-warning text-light">Add To Shopping Cart</button></Link> :
                                               <Link className="nav-link"> <button className="btn btn-danger" onClick={ () => NotificationManager.error('Login to Continue',"",2000)}>Add To Shopping Cart</button></Link>
                                           }
                                           {this.props.isAuthenticated ?
                                               <Link to={'/'}  className="nav-link"> <button className="btn btn-info text-light">Add To Wish List</button></Link> :
                                               <Link className="nav-link"> <button className="btn btn-info text-light" onClick={ () => NotificationManager.error('Login to Continue',"",2000)}>Add To Wish List</button></Link>
                                           }

                                           <br/><br/>
                                       </div>
                                   </div>
                               </div>

                           </div>
                           <br/>

                       </div>
                   )}
               </div>
               <div className="card-footer pb-0 pt-3">
                   {props.pager.pages && props.pager.pages.length &&
                   <ul className="pagination">
                       <li className={`page-item first-item ${props.pager.currentPage === 1 ? 'disabled' : ''}`}>
                           <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                       </li>
                       <li className={`page-item previous-item ${props.pager.currentPage === 1 ? 'disabled' : ''}`}>
                           <Link to={{ search: `?page=${props.pager.currentPage - 1}` }} className="page-link">Previous</Link>
                       </li>
                       {props.pager.pages.map(page =>
                           <li key={page} className={`page-item number-item ${props.pager.currentPage === page ? 'active' : ''}`}>
                               <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                           </li>
                       )}
                       <li className={`page-item next-item ${props.pager.currentPage === props.pager.totalPages ? 'disabled' : ''}`}>
                           <Link to={{ search: `?page=${props.pager.currentPage + 1}` }} className="page-link">Next</Link>
                       </li>
                       <li className={`page-item last-item ${props.pager.currentPage === props.pager.totalPages ? 'disabled' : ''}`}>
                           <Link to={{ search: `?page=${props.pager.totalPages}` }} className="page-link">Last</Link>
                       </li>
                   </ul>
                   }
               </div>
           </div>*/}

       </div>
    );
}
