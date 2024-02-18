const validate = (schema) => async (req, res, next) => {
  try {
    const bodyParse = await schema.parseAsync(req.body);
    req.body = bodyParse;
    return next();
  } catch (err) {
    const message = "Fill the input properly";
    const status = 422;
    const extraDetails = err.errors[0].message;
    // console.log(err);

    const error = {
      status,
      message,
      extraDetails,
    };

    return next(error);
  }
};

module.exports = validate;
