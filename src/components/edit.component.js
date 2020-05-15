import React, {Component} from 'react';
//To keep connectivity between frontend 'ReactJS' and backend 'NodeJS', we import axios
import axios from 'axios';

export default class EditBusiness extends Component{
    constructor(props) {
        super(props);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeNICNumber = this.onChangeNICNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            person_name : '',
            business_name : '',
            business_nic_number : ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/business/edit/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    person_name : response.data.person_name,
                    business_name : response.data.business_name,
                    business_nic_number : response.data.business_nic_number
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePersonName(e){
        this.setState({
            person_name : e.target.value
        });
    }

    onChangeBusinessName(e){
        this.setState({
            business_name : e.target.value
        });
    }

    onChangeNICNumber(e){
        this.setState({
            business_nic_number : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            business_nic_number: this.state.business_nic_number
        };
        axios.post('http://localhost:4000/business/update/' +this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/guest');
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add New Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Person Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.person_name}
                               onChange={this.onChangePersonName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Business Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.business_name}
                               onChange={this.onChangeBusinessName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add NIC Number :</label>
                        <input type="text" className="form-control"
                               value={this.state.business_nic_number}
                               onChange={this.onChangeNICNumber}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
