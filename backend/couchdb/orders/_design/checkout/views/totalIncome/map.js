function (doc) {
  if (doc.products.length > 0) {
    var value = doc.products.reduce(function(a, b) {
      return a + parseFloat(b.price);
    }, 0);
    emit(doc._id, value);
  }
}