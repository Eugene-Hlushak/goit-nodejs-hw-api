const contactValidation = (schema, obj) => {
  const isValid = schema.validate(obj);
  return isValid.value;
};

module.exports = {
  contactValidation,
};
