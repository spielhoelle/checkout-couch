var localDB = new PouchDB('orders')
var remoteDB = new PouchDB('http://localhost:5984/orders');
localDB.info().then(function (info) {
  console.log(info);
})

document.getElementById('submit').addEventListener("click", ( event, item ) => {
  let order = {};
  event.preventDefault(); 
  for (var i = 0, len = document.getElementById("checkout").elements.length; i < len; i++) {
    order[document.getElementById("checkout").elements[i].id] = document.getElementById("checkout").elements[i].value;
  }
  console.log(order);
  localDB.post(order);
  localDB.sync(remoteDB);
  $('#exampleModal').modal('show')

  localDB.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    console.log(result);
  }).catch(function (err) {
    console.log(err);
  });

})
