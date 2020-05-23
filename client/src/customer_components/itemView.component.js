import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button, NavItem} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";
import "react-notifications/lib/notifications.css";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import axios from 'axios';




class ItemViewComponent extends Component {

    state = {
        itemId : '',
        itemName : '',
        itemPrice : '',
        itemDiscount : '',
        itemCategory : ''
    }

    componentDidMount() {

        axios.get('http://localhost:5000/api/product/edit/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    itemId : response.data.product_id,
                    itemName : response.data.product_name,
                    itemPrice : response.data.product_price,
                    itemDiscount : response.data.product_discount,
                    itemCategory : response.data.product_category
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    };


    componentDidUpdate()  {
        this.loadPage();
    };

    static propTypes = {

        isAuthenticated : PropTypes.bool
    }



    render() {

        return (
            <div>




            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated : state.cus.isAuthenticated
})

export default connect(mapStateToProps) (ItemViewComponent);