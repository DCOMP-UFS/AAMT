const permiteMiddleware = (req, res, next) => {
  console.log( 'middleware' );

  return next();
}

module.exports = permiteMiddleware;