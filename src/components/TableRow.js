import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TableRow extends Component {
    render() {
        return (
                <tr>
                    <td>
                        {this.props.obj.person_name}
                    </td>
                    <td>
                        {this.props.obj.business_name}
                    </td>
                    <td>
                        {this.props.obj.business_nic_number}
                    </td>
                    <td>
                        {/*When clicks this, it goes to 'edit.component.js' file*/}
                        <Link to={"/edit/" +this.props.obj._id} className="btn btn-primary"> Edit </Link>
                    </td>
                    <td>
                        <button className="btn btn-primary"> Delete </button>
                    </td>
                </tr>
        );
    }
}

export default TableRow;
