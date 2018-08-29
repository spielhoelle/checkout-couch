import React from 'react';
import PouchDB from 'pouchdb';
import Order from './Order.jsx';
const localDB = new PouchDB('orders')
const remoteDB = new PouchDB(process.env.REACT_APP_COUCHURL);


class Admin extends React.Component {
  state = {
    orders: []
  }
  componentWillMount = async() => {
    localDB.sync(remoteDB)
    try {
      let orders = await localDB.query('byEmail', {
        include_docs: true,
        attachments: true
      })
      console.log('All docs:', orders);
      orders = orders.rows
      this.setState({orders})
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center"> Recent Orders </h1>
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
              {this.state.orders.map((order) => 
                <Order key={order.id} order={order}  />
              )
              }
            </tbody>
          </table>
      </div>
    );
  }
}
export default Admin
