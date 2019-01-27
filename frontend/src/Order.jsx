import React from 'react';
import {Link} from 'react-router-dom';

class Order extends React.Component {
  render() {
      console.log(this.props)
    return (
          <tr>
            <th scope="row">{this.props.order.key}</th>
            <td>{this.props.order.doc.form.firstName}</td>
            <td>{this.props.order.doc.form.lastName}</td>
            <td>{this.props.order.doc.form.email}</td>
            <td>{this.props.order.doc.form.userName}</td>
            <td>{this.props.order.doc.form.userName}</td>
            <td>{this.props.order.doc.form.userName}</td>
            <td> <Link to={`/orders/${this.props.order.doc._id}`}>View</Link> </td>
          </tr>
      );
  }
}
export default Order;
