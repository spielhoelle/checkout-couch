import React from 'react';
import PouchDB from 'pouchdb';
const localDB = new PouchDB('orders')
const remoteDB = new PouchDB(process.env.REACT_APP_COUCHURL);

class Item extends React.Component {
	render() {
  	return <li>
      	{ this.props.name }
        { this.props.children }
    </li>
  }
}

class ShowOrder extends React.Component {
  state = {
    order: []
  }
  componentWillReceiveProps = (nextProps) => {
  console.log('#####', nextProps);
  }
  componentWillMount = async() => {
  console.log('#####', this.props);
    localDB.sync(remoteDB)
    try {
      let order = await localDB.get(this.props.route.match.params.id, {
        include_docs: true,
        attachments: true
      })
      console.log('THE DOC:', order);
      this.setState({order})
    } catch (err) {
      console.log(err);
    }
  }
  //list(data) {
    //console.log('#####', data);
    //if(!data.length) return;
      //const children = (items) => {
            //if (items) {
              //return <ul>{ this.list(items) }</ul>
      //}
    //}
    
    //return data.map((node, index) => {
      //return <Item key={ node.id } name={ node.name }>
        //{ children(node.items) }
      //</Item>
    //})
  //}
  render() {
    //var html = this.list(this.state.order)

    //console.log(this.props)
    return (
          <div>{JSON.stringify(this.state.order)}</div>
        );
  }
}
export default ShowOrder;
