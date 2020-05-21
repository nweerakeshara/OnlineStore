import React, {Component} from 'react';

class OptionRow extends Component {
    render() {
        return (
            // <tr>
            //     <td>
            //         {this.props.obj.product_id}
            //     </td>
            // </tr>
        <option>{this.props.obj.productcategory_name}</option>
        );
    }
}

export default OptionRow;
