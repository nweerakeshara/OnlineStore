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
import axios from "axios";
import Ratings, { UserRating } from "../components/UI/Ratings";

class ItemViewComponent extends Component {
  state = {
    itemId: "",
    itemName: "",
    itemPrice: "",
    itemDiscount: "",
    item_id: "",
    imageData: "",
  };

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/product/edit/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          itemId: response.data.product_id,
          itemName: response.data.product_name,
          itemPrice: response.data.product_price,
          itemDiscount: response.data.product_discount,
          item_id: response.data._id,
          imageData: response.data.imageData,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    cus: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.cus;

    return (
      <div>
        <NotificationContainer />
        <div className="row">
          <div className="col-sm-8">
            <img
              height="100%"
              width="100%"
              src={`/uploads/${this.state.imageData}`}
            />
          </div>
          <div className="col-sm-4">
            <h5 className="font-weight-bold text-center">
              {this.state.itemName}
            </h5>
            <h4 className="font-weight-bold text-center text-danger">
              Price : Rs {this.state.itemPrice}.00
            </h4>
            <h5 className="font-weight-bold text-center text-danger">
              Discount : Rs {this.state.itemDiscount}.00
            </h5>
            <br />

            <h6 className="font-weight-bold text-center">
              Product ID : {this.state.itemId}
            </h6>
            <p className="font-weight-bold text-center text-muted">
              ID :{this.state.item_id}
            </p>
            <br />

            {this.props.isAuthenticated ? (
              <Link to={"/"} className="nav-link text-center">
                {" "}
                <button className="btn btn-warning text-light">
                  Add To Shopping Cart
                </button>
              </Link>
            ) : (
              <Link className="nav-link text-center">
                {" "}
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    NotificationManager.error("Login to Continue", "", 2000)
                  }
                >
                  Add To Shopping Cart
                </button>
              </Link>
            )}
            {this.props.isAuthenticated ? (
              <Link to={"/"} className="nav-link text-center">
                {" "}
                <button
                  className="btn btn-info text-light"
                  onClick={() =>
                    NotificationManager.error(`Hi ${user._id}`, "", 2000)
                  }
                >
                  Add To Wish List
                </button>
              </Link>
            ) : (
              <Link className="nav-link text-center">
                {" "}
                <button
                  className="btn btn-info text-light"
                  onClick={() =>
                    NotificationManager.error("Login to Continue", "", 2000)
                  }
                >
                  Add To Wish List
                </button>
              </Link>
            )}

            <br />
            <div className="text-center">
              {!this.props.isAuthenticated ? (
                <Ratings pid={this.state.item_id}> </Ratings>
              ) : (
                <div>
                  <Ratings pid={this.state.item_id} />
                  <UserRating cusId={user._id} id={this.state.item_id}>
                    {" "}
                  </UserRating>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            {" "}
            <br />
            <br />
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

export default connect(mapStateToProps, null)(ItemViewComponent);
