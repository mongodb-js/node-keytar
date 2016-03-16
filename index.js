var binary = require('node-pre-gyp');
var path = require('path');
var src = binary.find(path.join(__dirname, 'package.json'));
var binding = require(src);

module.exports = {
  getPassword: function(service, account) {
    if (!service) {
      throw new TypeError('Service is required.');
    }

    if (!account) {
      throw new TypeError('Account is required.');
    }

    return binding.getPassword(service, account);
  },
  addPassword: function(service, account, password) {
    if (!service) {
      throw new TypeError('Service is required.');
    }

    if (!account) {
      throw new TypeError('Account is required.');
    }

    if (!password) {
      throw new TypeError('Password is required.');
    }

    return binding.addPassword(service, account, password);
  },
  deletePassword: function(service, account) {
    if (!service) {
      throw new TypeError('Service is required.');
    }

    if (!account) {
      throw new TypeError('Account is required.');
    }

    return binding.deletePassword(service, account);
  },
  replacePassword: function(service, account, password) {
    if (!service) {
      throw new TypeError('Service is required.');
    }

    if (!account) {
      throw new TypeError('Account is required.');
    }

    if (!password) {
      throw new TypeError('Password is required.');
    }

    binding.deletePassword(service, account);
    return binding.addPassword(service, account, password);
  },
  findPassword: function(service) {
    if (!service) {
      throw new TypeError('Service is required.');
    }

    return binding.findPassword(service);
  }
};
