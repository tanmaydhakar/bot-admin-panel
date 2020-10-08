'use strict';
var acl = require('acl');

// eslint-disable-next-line new-cap
acl = new acl(new acl.memoryBackend());
acl.allow([{
  roles: ['User'],
  allows: []
},{
  roles: ['Judge'],
  allows: []
}, {
  roles: ['Admin'],
  allows: [{
    resources: '/api/product/:productId',
    permissions: ['get']
  },{
    resources: '/api/product',
    permissions: ['post']
  },{
    resources: '/api/product/:productId',
    permissions: ['patch']
  },{
    resources: '/api/product/:productId',
    permissions: ['delete']
  }]
}]);

exports.isAllowed = function (req, res, next) {
  const roles = (req.user) ? req.user.roles : ['guest'];
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        return next();
      } else {
        return res.status(403).send({
          statusCode: 403,
          message: 'User is not authorized'
        });
      }
    }
  });
};
