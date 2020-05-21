import React, {Component} from 'react';
import axios from "axios";




class LoginCustomer extends Component {
    state={
        cusUn: "",
        cusPw: "",

    }


    onChangeCusUn = (e) => {
        this.setState({
            cusUn: e.target.value
        });
    }



    onChangeCusPw = (e) => {
        this.setState({
            cusPw: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            cusUn : this.state.cusUn,

            cusPw: this.state.cusPw
        };
        console.log(axios.post('http://localhost:5000/api/cus/login', obj).then(res => {



        }));
        this.setState({
            cusUn : "",

            cusPw: ""
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Customer Sign In</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username :</label>
                        <input type="text" className="form-control" value={this.state.cusUn} onChange={this.onChangeCusUn}/>

                    </div>



                    <div className="form-group">
                        <label>Password :</label>
                        <input type="text" className="form-control" value={this.state.cusPw} onChange={this.onChangeCusPw}/>

                    </div>


                    <div className="form-group">

                        <input type="submit" value="Login" className="btn btn-primary"/>

                    </div>
                </form>
            </div>
        );
    }
}

export default LoginCustomer;