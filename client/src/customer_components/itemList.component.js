import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems} from "../actions/itemActions";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


class ItemListComponent extends Component {

    state = {
        pager: {},
        pageOfItems: []
    };

    componentDidMount() {
        this.props.getItems();
        this.loadPage();
    };


    componentDidUpdate()  {

        this.loadPage();
    };

    static propTypes = {
        getItems : PropTypes.func.isRequired,
        item : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool
    }

    loadPage =() => {
        // get page of items from api
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
            fetch(`http://localhost:5000/api/item/get/all/paginate?page=${page}`, {method: 'GET'})
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    this.setState({pager, pageOfItems});
                });
        }

    }
    render() {


        const { pager, pageOfItems } = this.state;

        return (

            <div className="card text-center m-3">
                <h3 className="card-header">Clothing List</h3>
                <div className="card-body">
                    {pageOfItems.map(item =>
                        <div key={item._id}>{item.product_name}{this.props.isAuthenticated ? <button className="alert-danger">Add to Cart</button> : <p className="alert-danger">Login to Continue</p>}</div>
                    )}
                </div>
                <div className="card-footer pb-0 pt-3">
                    {pager.pages && pager.pages.length &&
                    <ul className="pagination">
                        <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                        </li>
                        {pager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                            </li>
                        )}
                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                        </li>
                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                        </li>
                    </ul>
                    }
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated : state.cus.isAuthenticated
})

export default connect(mapStateToProps, {getItems}) (ItemListComponent);