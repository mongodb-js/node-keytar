# keytar [![travis][travis_img]][travis_url] [![appveyor][appveyor_img]][appveyor_url]

> Securely store and manage passwords using platform specific backends. The backend on macOS is [Keychain][keychain], on Linux it's [the Secret Service][secret service], and on Windows it's [Credential Vault][credential vault].

## Install and Usage

```bash
npm install keytar
```

```javascript
const keytar = require('keytar');

keytar.addPassword('com.mycompany.myapp', 'weblogin', 'myPassword');
>> true
keytar.getPassword('com.mycompany.myapp', 'weblogin');
>> 'myPassword'
keytar.replacePassword('com.mycompany.myapp', 'weblogin', 'myBett3rPassw0rd');
>> true
keytar.getPassword('com.mycompany.myapp', 'weblogin');
>> 'myBett3rPassw0rd'
keytar.removePassword('com.mycompany.myapp', 'weblogin');
>> true
```

### Linux

Currently this library uses `libsecret` so you may need to install it before `npm install`ing.

Depending on your distribution, you will need to run the following command:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch: `sudo pacman -S libsecret`

## API

### getPassword(service, account)

Get the stored password for the `service` and `account`.

`service` - The string service name.

`account` - The string account name.

Returns the string password or `null` on failures.

### addPassword(service, account, password)

Add the `password` for the `service` and `account` to the keychain.

`service` - The string service name.

`account` - The string account name.

`password` - The string password.

Returns `true` on success, `false` on failure.

### deletePassword(service, account)

Delete the stored password for the `service` and `account`.

`service` - The string service name.

`account` - The string account name.

Returns `true` if a password has been deleted, or `false` on failure.

### replacePassword(service, account, password)

Replace the `password` for the `service` and `account` in the keychain.

This is a simple convenience function that internally calls
`deletePassword(service, account)` followed by
`addPassword(service, account, password)`.

`service` - The string service name.

`account` - The string account name.

`password` - The string password.

Returns `true` on success, `false` on failure.

### findPassword(service)

Find a password for the `service` in the keychain.

`service` - The string service name.

Returns the string password or `null` on failures.

## Development

```bash
git clone git@github.com:mongodb-js/node-keytar.git ~/keytar;
cd ~/keytar;
npm install;
npm test;
```

[travis_img]: https://travis-ci.org/mongodb-js/node-keytar.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/node-keytar
[appveyor_img]: https://ci.appveyor.com/api/projects/status/59d972f9yof17hjq?svg=true
[appveyor_url]: https://ci.appveyor.com/project/imlucas/node-keytar
[secret service]: https://developer.gnome.org/libsecret/unstable/SecretService.html
[keychain]: https://en.wikipedia.org/wiki/Keychain_(software)
[credential vault]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa374792(v=vs.85).aspx
