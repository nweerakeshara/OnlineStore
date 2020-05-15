import React, {Component} from 'react';
import axios from 'axios';

const Categories = [
    { key: 1, value: "Mens wear" },
    { key: 2, value: "Kids wear" },
    { key: 3, value: "Ladies wear" },
    { key: 4, value: "Trouser" },
    { key: 5, value: "Skirt" },
    { key: 6, value: "Blouse" },
    { key: 7, value: "TShirt" }
]

export default class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : ''
        }
    }

    onChangeProductId(e){
        this.setState({
            product_id: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductDiscount(e){
        this.setState({
            product_discount: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            product_id : this.state.product_id,
            product_name : this.state.product_name,
            product_price : this.state.product_price,
            product_discount : this.state.product_discount,
            product_category : this.state.product_category
        };

        axios.post('http://localhost:4000/product/add', obj)
            .then(res => {
                if(res.data.success){
                    console.log(res.data)
                    alert('Product added successfully')
                }
            });

        this.setState({
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : ''
        })

        this.props.history.push('/guest');
    }

    handleChangeCategory = (event) => {
        this.setState({ product_category: event.currentTarget.value })
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Product ID :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_id}
                               onChange={this.onChangeProductId}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_name}
                               onChange={this.onChangeProductName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Price :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_price}
                               onChange={this.onChangeProductPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Discount :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_discount}
                               onChange={this.onChangeProductDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Category :</label>
                        <select onChange={this.handleChangeCategory}>
                            {Categories.map(item => (
                                <option key={item.key} value={item.value}>{item.value}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Product" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
