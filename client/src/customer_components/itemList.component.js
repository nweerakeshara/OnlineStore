import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems} from "../actions/itemActions";
import PropTypes from 'prop-types';

class ItemListComponent extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    static propTypes = {
        getItems : PropTypes.func.isRequired,
        item : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool
    }




    render() {


        const {items} = this.props.item;

        return (

            <Container>



                <ListGroup>
                    <TransitionGroup className="item-list">
                        {items.map(({_id, product_id, product_name, product_price, product_discount, product_category}) => (
                            <CSSTransition key={_id}  className="alert-primary">
                                <ListGroupItem>
                                    {product_id} {product_name} {product_price} {product_discount} {product_category}
                                    {this.props.isAuthenticated ? <button className="alert-danger">Add to Cart</button> : <p className="alert-danger">Login to Continue</p>}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated : state.cus.isAuthenticated
})

export default connect(mapStateToProps, {getItems}) (ItemListComponent);