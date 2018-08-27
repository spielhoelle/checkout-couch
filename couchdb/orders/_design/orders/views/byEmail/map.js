function (doc) {
  if (doc.form !== undefined) {
    emit(doc.form.email, doc);
  }
}