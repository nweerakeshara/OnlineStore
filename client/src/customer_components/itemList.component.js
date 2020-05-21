import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button, NavItem} from 'reactstrap';
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
        // get page details and items from api
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
            fetch(`http://localhost:5000/api/items/get/all/paginate?page=${page}`, {method: 'GET'})
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
                <div className="card-body ">
                    {pageOfItems.map(item =>

                        <div key={item._id}>
                            <div className="container rounded-0 border border-danger ">


                               

                            <div className="container ">
                                <div className="row">
                                    <div className="col-sm">
                                        {item.product_name}
                                    </div>
                                    <div className="col-sm">
                                        One of three columns
                                    </div>
                                    <div className="col-sm">
                                        One of three columns
                                    </div>
                                </div>
                            </div>


                            <div className="container " >
                                <div className="row">
                                    <div className="col-sm">
                                        Product ID : {item.product_id}
                                    </div>
                                    <div className="col-sm">
                                        <Link to={'/'}  className="nav-link"> <button className="btn btn-success">View</button></Link>
                                    </div>
                                    <div className="col-sm">
                                        {this.props.isAuthenticated ?
                                            <Link to={'/'}  className="nav-link"> <button className="btn btn-warning text-light">To Cart</button></Link> :
                                            <Link to={'/loginCus'}  className="nav-link"> <button className="btn btn-primary">Login</button></Link>
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>
                            <br/>

                        </div>
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