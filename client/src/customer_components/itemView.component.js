import React, { Component } from "react";
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
import CommentsView from "./commentsView.component";
import WishList from "../components/WishList";
import ModalPrompt from "../components/UI/ModalPrompt";
import Cart from "../components/Cart";
class ItemViewComponent extends Component {
  state = {
    itemId: "",
    itemName: "",
    itemPrice: "",
    itemDiscount: "",
    item_id: "",
    imageData: "",
    commBody: "",
    cusUn: "",
    product_id: "",
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

  onChangeComment = (e) => {
    this.setState({
      commBody: e.target.value,
    });
  };

  onChangeItemId = (e) => {
    this.setState({
      product_id: e.target.value,
    });
  };

  onChangeCusUsername = (e) => {
    this.setState({
      cusUn: e.target.value,
    });
  };

  onSubmitComment = (e) => {
    e.preventDefault();

    const { commBody, product_id, cusUn } = this.state;
    const comment = {
      cusUn,
      product_id,
      commBody,
    };

    axios
      .post("http://localhost:5000/api/comments/add", comment)
      .then((res) => {
        if (res.data.success == true) {
          NotificationManager.success(
            "Click Here to view the Wish List",
            "Comment Submitted",
            10000
          );
        } else {
          NotificationManager.error(
            "Click Here to view the Wish List",
            "Comment Failed",
            10000
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      commBody: "",
      cusUn: "",
      product_id: "",
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.cus;

    return (
      <div>
        <Cart></Cart>
        <br></br>
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
              <div>
                <ModalPrompt
                  id={this.state.item_id}
                  name={this.state.itemName}
                  price={this.state.itemPrice}
                ></ModalPrompt>
                <br />
              </div>
            ) : (
              <Link className="nav-link text-center">
                {" "}
                <button
                  className="btn btn-danger btn-block"
                  onClick={() =>
                    NotificationManager.error("Login to Continue", "", 2000)
                  }
                >
                  Add To Shopping Cart
                </button>
              </Link>
            )}
            {this.props.isAuthenticated ? (
              <div className="btn-block">
                <WishList
                  name={this.state.itemName}
                  price={this.state.itemPrice}
                  id={this.state.item_id}
                  usr_id={user._id}
                  img_id={this.state.imageData}
                />
              </div>
            ) : (
              <Link className="nav-link" style={{ margin: "0", padding: "0" }}>
                <button
                  className="btn btn-info text-light btn-block"
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
                <div>
                  <Ratings pid={this.state.item_id}> </Ratings>
                </div>
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
            <br />
            <br />

            <CommentsView productid={this.state.item_id}></CommentsView>

            {this.props.isAuthenticated ? (
              <div>
                <h5>Add Comment :</h5>
                <form onSubmit={this.onSubmitComment}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.item_id}
                      onMouseMove={this.onChangeItemId}
                    />
                    <input
                      type="text"
                      className="form-control"
                      value={user.cusUn}
                      onMouseMove={this.onChangeCusUsername}
                    />

                    <input
                      type="text"
                      className="form-control"
                      value={this.state.commBody}
                      onChange={this.onChangeComment}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            ) : null}
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
