import React, {Component} from 'react';
import axios from "axios";




class LogoutCustomer extends Component {



    onClick = (e) => {
        e.preventDefault();

        console.log(axios.get('http://localhost:5000/api/cus/logout').then(response => {
            if (response.status === 200) {
                //
            } else {
                alert('Log Out Failed')
            }
        }));

    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.onClick}>Logout</button>
            </div>
        );
    }
}

export default LogoutCustomer;