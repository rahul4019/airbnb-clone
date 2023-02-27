const jwt = require('jsonwebtoken');

const userFromToken = (req) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log('token in backend : ', token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('user: ', decoded )
  return decoded;
};

module.exports = userFromToken;
