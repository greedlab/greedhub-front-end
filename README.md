# greedhub-front-end

a GitHub third party client for front end, which is based on node.js.

on line : <https://greedhub-greedlab.rhcloud.com/>

## Usage

English | [中文](README-CN.md)

### install dependencies

```
$ cd greedhub-front-end
$ npm install
```

### start

```
$ DEBUG=greedhub-front-end* npm start
```

### browse

<http://localhost:3000>

## deploy on line

### github

<https://github.com/settings/developers> add an application, and set`Authorization callback URL` `<your address>/callback`

### util/config.js

modify `client_id` and `client_secret` in `util/config.js`

## License

[MIT](LICESE)