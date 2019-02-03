require("dotenv").config();
const path = require("path")
require('dotenv').config({ path: path.join(__dirname + '/.env') });

const uuid = require("uuid");
var faker = require('faker');

var PouchDB = require("pouchdb-http");
// PouchDB.plugin(require("pouchdb-find"));
// PouchDB.debug.enable("pouchdb:find");
if (typeof process.env.REACT_APP_COUCHURL === "undefined") {
  console.error(
    "No REACT_APP_COUCHURL set, please define it in your environment"
  );
  process.exit(1);
}

const databases = {
  orders: new PouchDB(process.env.REACT_APP_COUCHURL + "/orders")
};

var promises = [];

const NUMBER_OF_DOCS = 100;
for (i = 0; i < NUMBER_OF_DOCS; i++) {
  const doc = {
    _id: `${uuid.v4()}`,
    form: {
      firstName: faker.Name.firstName(),
      lastName: faker.Name.lastName(),
      userName: faker.Internet.userName(),
      email: faker.Internet.email(),
      address: faker.Address.streetName(),
      address2: faker.Address.secondaryAddress(),
      country: faker.Address.ukCountry(),
      state: faker.Address.usState(),
      zip: faker.Address.zipCode()
    }
  };
  doc.products = [];

  for (let n = 0; n < Math.floor(Math.random() * 5); n++) {
    doc.products.push({
      id: n,
      name: faker.random.bs_buzz(),
      release: faker.Date.past(),
      amount: Math.floor(Math.random() * 10),
      price: [3, 9.99, 19.99, 30, 89.90][Math.floor(Math.random() * 5)],
      liked: [true, false][Math.floor(Math.random() * 2)]
    });
  }
  
  promises.push(databases.orders.put(doc));
}

Promise.all(promises)
  .then(() => {
    console.log(`${promises.length} documents added`);
  })
  .catch(e => {
    console.log("error", e);
  });
