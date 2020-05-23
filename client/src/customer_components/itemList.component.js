import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  NavItem,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import disableBrowserBackButton from "disable-browser-back-navigation";
import WishList from "../components/WishList";
import WishListView from "../components/WishList.view";

class ItemListComponent extends Component {
  state = {
    pager: {},
    pageOfItems: [],
  };

  componentDidMount() {
    this.loadPage();
    disableBrowserBackButton();
  }

  componentDidUpdate() {
    this.loadPage();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    cus: PropTypes.object.isRequired,
  };

  loadPage = () => {
    // get page details and items from api
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page")) || 1;
    if (page !== this.state.pager.currentPage) {
      fetch(`http://localhost:5000/api/items/get/all/paginate?page=${page}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(({ pager, pageOfItems }) => {
          this.setState({ pager, pageOfItems });
        });
    }
  };

  render() {
    const { user } = this.props.cus;
    const { pager, pageOfItems } = this.state;
    return (
      <div>
        {this.props.isAuthenticated ? (
                          //    <Link to={'/'}  className="nav-link"> <button className="btn btn-info text-light" onClick={ () => NotificationManager.error(`Hi ${user._id}`,2000)}>Add To Wish List</button></Link> :
                          <WishListView
                           
                          />
                        ) : (
                        //   <Link className="nav-link">
                        //     {" "}
                        //     <button
                        //       className="btn btn-info text-light"
                        //       onClick={() =>
                        //         NotificationManager.error(
                        //           "Login to Continue",
                        //           "",
                        //           2000
                        //         )
                        //       }
                        //     >
                        //       Wish List
                        //     </button>
                        //   </Link>
                        ""
                        )}
        <div className="card text-center m-3">
          <h3 className="card-header font-weight-bold">Clothing List</h3>
          <NotificationContainer />
          <div className="card-body ">
            {pageOfItems.map((item) => (
              <div key={item._id}>
                <div className="container rounded-0 border border-info ">
                  <div className="container ">
                    <div className="row">
                      <div className="col-sm">
                        <br />
                        <img
                          height="80%"
                          width="100%"
                          src={`/uploads/${item.imageData}`}
                        />
                        <br />
                      </div>
                      <div className="col-sm">
                        <br />
                        <br />
                        <br />
                        <h5 className="font-weight-bold text-center">
                          {item.product_name}
                        </h5>
                        <h4 className="font-weight-bold text-center text-danger">
                          Price : Rs {item.product_price}.00
                        </h4>
                        <h5 className="font-weight-bold text-center text-danger">
                          Discount : Rs {item.product_discount}.00
                        </h5>
                        <br />
                        <br />
                      </div>
                      <div className="col-sm">
                        <br />
                        <br />
                        <Link to={"/view/" + item._id} className="nav-link">
                          {" "}
                          <button className="btn btn-success">
                            {" "}
                            View This Item{" "}
                          </button>
                        </Link>
                        {this.props.isAuthenticated ? (
                          <Link to={"/"} className="nav-link">
                            {" "}
                            <button className="btn btn-warning text-light">
                              Add To Shopping Cart
                            </button>
                          </Link>
                        ) : (
                          <Link className="nav-link">
                            {" "}
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                NotificationManager.error(
                                  "Login to Continue",
                                  "",
                                  2000
                                )
                              }
                            >
                              Add To Shopping Cart
                            </button>
                          </Link>
                        )}
                        {this.props.isAuthenticated ? (
                          //    <Link to={'/'}  className="nav-link"> <button className="btn btn-info text-light" onClick={ () => NotificationManager.error(`Hi ${user._id}`,2000)}>Add To Wish List</button></Link> :
                          <WishList
                            name={item.product_name}
                            price={item.product_price}
                            id={item._id}
                          />
                        ) : (
                          <Link className="nav-link">
                            {" "}
                            <button
                              className="btn btn-info text-light"
                              onClick={() =>
                                NotificationManager.error(
                                  "Login to Continue",
                                  "",
                                  2000
                                )
                              }
                            >
                              Add To Wish List
                            </button>
                          </Link>
                        )}

                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
          <div className="card-footer pb-0 pt-3">
            {pager.pages && pager.pages.length && (
              <ul className="pagination">
                <li
                  className={`page-item first-item ${
                    pager.currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <Link to={{ search: `?page=1` }} className="page-link">
                    First
                  </Link>
                </li>
                <li
                  className={`page-item previous-item ${
                    pager.currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.currentPage - 1}` }}
                    className="page-link"
                  >
                    Previous
                  </Link>
                </li>
                {pager.pages.map((page) => (
                  <li
                    key={page}
                    className={`page-item number-item ${
                      pager.currentPage === page ? "active" : ""
                    }`}
                  >
                    <Link
                      to={{ search: `?page=${page}` }}
                      className="page-link"
                    >
                      {page}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item next-item ${
                    pager.currentPage === pager.totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.currentPage + 1}` }}
                    className="page-link"
                  >
                    Next
                  </Link>
                </li>
                <li
                  className={`page-item last-item ${
                    pager.currentPage === pager.totalPages ? "disabled" : ""
                  }`}
                >
                  <Link
                    to={{ search: `?page=${pager.totalPages}` }}
                    className="page-link"
                  >
                    Last
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.cus.isAuthenticated,
  cus: state.cus,
});

export default connect(mapStateToProps, null)(ItemListComponent);
