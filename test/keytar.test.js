var keytar = require('../');
var assert = require('assert');

describe('keytar', function() {
  var service = 'keytar tests';
  var account = 'buster';
  var password = 'secret';
  var account2 = 'buster2';
  var password2 = 'secret2';

  before(function() {
    if (process.env.TRAVIS) {
      return this.skip();
    }
  });

  beforeEach(function() {
    keytar.deletePassword(service, account);
    keytar.deletePassword(service, account2);
  });
  afterEach(function() {
    keytar.deletePassword(service, account);
    keytar.deletePassword(service, account2);
  });
  describe('addPassword(service, account, password)', function() {
    it('returns true when the service, account, and password are specified', function() {
      assert.equal(keytar.addPassword(service, account, password), true);
    });
  });
  describe('getPassword(service, account, password)', function() {
    it('returns the password for service and account', function() {
      assert.equal(keytar.addPassword(service, account, password), true);
      assert.equal(keytar.getPassword(service, account), password);
    });
  });
  describe('deletePassword(service, account)', function() {
    it('returns true when the password for the service and account has been deleted', function() {
      assert.equal(keytar.deletePassword(service, account), false);
      assert.equal(keytar.addPassword(service, account, password), true);
      assert.equal(keytar.deletePassword(service, account), true);
      assert.equal(keytar.deletePassword(service, account), false);
    });
  });
  describe('replacePassword(service, account, password)', function() {
    it('returns true when the password for the service and account has been deleted and readded', function() {
      assert.equal(keytar.addPassword(service, account, password), true);
      assert.equal(keytar.replacePassword(service, account, 'another secret'), true);
      assert.equal(keytar.getPassword(service, account), 'another secret');
    });
  });
  describe('findPassword(service)', function() {
    it('returns a password of the service', function() {
      var found;
      assert.equal(keytar.addPassword(service, account, password), true);
      assert.equal(keytar.addPassword(service, account2, password2), true);
      found = keytar.findPassword(service);
      assert([password, password2].indexOf(found) > -1);
    });
  });
});
