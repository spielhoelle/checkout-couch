
import React from 'react';
import Product from './Product.jsx';
import Form from './Form.jsx';

class CheckoutForm extends React.Component {

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">

              {this.props.products.map((person, i) => <Product updateProducts={this.props.updateProducts} key = {i} data = {person} />)}

              <li className="list-group-item d-flex justify-content-between lh-condensed">
                Total: <span className="font-weight-bold">{this.props.total.toFixed(2)} $ </span>
              </li>

            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code"/>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </form>
            
          </div>

          { /* Form needs data on load and the change handler */ }
          <Form data={this.props.data} saveData={this.props.saveData} handleFormData={this.props.handleFormData} />

        </div>
      </div>
    );
  }
}
export default CheckoutForm;
