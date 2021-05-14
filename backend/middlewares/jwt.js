// const jwt = require("express-jwt");
const secret = process.env.JWT_SECRET;
const apiResponse = require("../helpers/apiResponse");

// const authenticate = jwt({
//   secret: secret,
// });

// module.exports = authenticate;

const jwt = require("express-jwt");

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({
      secret: secret,
    }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return apiResponse.ErrorResponse(res, "Unauthorize");
      }

      // authentication and authorization successful
      next();
    },
  ];
}
