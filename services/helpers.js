const bodyValidation = (schema, obj) => {
  const isValid = schema.validate(obj);
  return isValid.value;
};

module.exports = {
  bodyValidation,
};
