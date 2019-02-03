import React from "react";
import PouchDB from "pouchdb";
import Order from "./Order.jsx";
const localDB = new PouchDB("orders");
console.log(process.env.REACT_APP_COUCHURL);

const remoteDB = new PouchDB(process.env.REACT_APP_COUCHURL);

class Admin extends React.Component {
  state = {
    orders: [],
    total: 0
  };
  componentWillMount = async () => {
    localDB.sync(remoteDB);
    try {
      let ordersQuery = localDB.query("checkout/byEmail", {
        include_docs: true,
        attachments: true
      });
      let totalQuery = localDB.query("checkout/totalIncome");

      let [orders, total] = await Promise.all([ordersQuery, totalQuery]);

      total = total.rows[0].value.toFixed(2);
      orders = orders.rows;
      this.setState({ orders, total });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const total = this.state.total !== null ? this.state.total : null;
    return (
      <div className="container">
        <h1 className="text-center"> Recent Orders {total}</h1>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(order => (
              <Order key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Admin;
