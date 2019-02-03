import React from "react";
import PouchDB from "pouchdb";
const localDB = new PouchDB("orders");
const remoteDB = new PouchDB(process.env.REACT_APP_COUCHURL);

class ShowOrder extends React.Component {
  state = {
    order: []
  };
  componentWillReceiveProps = nextProps => {
    console.log("#####", nextProps);
  };
  componentWillMount = async () => {
    console.log("#####", this.props);
    localDB.sync(remoteDB);
    try {
      let order = await localDB.get(this.props.route.match.params.id, {
        include_docs: true,
        attachments: true
      });
      console.log("THE DOC:", order);
      this.setState({ order });
    } catch (err) {
      console.log(err);
    }
  };
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
  flatten = data => {
    var result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l === 0) result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(data, "");
    return result;
  };

  render() {
    //var html = this.list(this.state.order)

    //console.log(this.props)
    const flattJson = this.flatten(this.state.order);
    const list = Object.values(flattJson).map(obj => <li>{obj}</li>);
    return <div>{list}</div>;
  }
}
export default ShowOrder;
