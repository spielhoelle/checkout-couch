import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import CheckoutForm from './CheckoutForm.jsx';
import Header from './Header.jsx';
import Admin from './Admin.jsx';
import ShowOrder from './ShowOrder.jsx';
import PouchDB from 'pouchdb';

const localDB = new PouchDB('orders')
const remoteDB = new PouchDB(process.env.REACT_APP_COUCHURL);
console.log('process.env.REACT_APP_COUCHURL', process.env.REACT_APP_COUCHURL);

class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = JSON.parse( localStorage.getItem('react-cart') ) || {
        products:
        [
          {
            "id": 0,
            "name":" JavaScript: The Definitive Guide, 6th Edition",
            "release": "September 2010",
            "amount": 1,
            "price":"2.99"
          },
          {
            "id":1,
            "name":"Ruby on Rails: Up and Running",
            "release": "March 2007",
            "amount": 1,
            "price":"30.99"
          },
          {
            "id":2,
            "name":"MongoDB: The Definitive Guide",
            "release": "Januar 2019",
            "amount": 1,
            "price":"99.99"
          },
                  {
            "id":3,
            "name":"Linux Cookbook",
            "release": "Februar 2009",
            "amount": 1,
            "price":"24.99"
          },

        ],
        total: 0,
        form: {},
        headerdata: {
          "title": "CouchCheckout",
          "desc": "Stuff that goes with a few lines of javascript in a couchdb!"
        }
    }
  }

  saveData = async(event) => {
    event.preventDefault(); 
    let order = {
      form: this.state.form,
      products: this.state.products
    }

    try {
      await localDB.post(order);
      console.log("successfully saved to db");
      localDB.sync(remoteDB)
      .on('change', function (info) {
        console.log('Sync change: ', info);
      })
      .on('error', function (err) {
        console.log('Sync error: ', err);
      });
      try {
        const result = await localDB.allDocs({
          include_docs: true,
          attachments: true
        });
        console.log('All docs:', result);
      } catch (err) {
        console.log(err);
      }

    } catch (err) {
      console.log(err);
    }
  }

  updateProducts = (item, index) => {
    const data = this.state.products
    if ( index === "like" ) {
      data[item.props.data.id].liked = !data[item.props.data.id].liked 
    }
    else if (index)
      data[item.props.data.id].amount++
    else if (data[item.props.data.id].amount > 0)
      data[item.props.data.id].amount--

    this.setState({
      total: data.map((item, index, array)=> item.price * item.amount).reduce((a, b) => a + b, 0)
    })
    localStorage.setItem('react-cart', JSON.stringify(this.state));
  }

  handleFormData = (field, value) => {
    let data = { ...this.state.form };
    data[field] = value
    this.setState({ form: data })
    localStorage.setItem('react-cart', JSON.stringify(this.state));
  }

  render() {
  console.log('#####', "render");
    return (
      <BrowserRouter>
        <div className="w-100">
          <Header headerdata={this.state.headerdata}/>
          <Route exact path="/" render={() => <CheckoutForm updateProducts={this.updateProducts} data={this.state.form} total={this.state.total} products={this.state.products} handleFormData={this.handleFormData} saveData={this.saveData}/>}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/orders/:id" render={(route) => <ShowOrder route={route}/>}/>
        </div>
        
      </BrowserRouter>
    );
  }
}
export default App;
