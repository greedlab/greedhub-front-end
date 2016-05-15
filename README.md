# greedhub-front-end

a GitHub third party client for front end, which is based on node.js.

address : <https://greedhub-greedlab.rhcloud.com/>

## Usage

English | [中文](README-CN.md)

### config github

<https://github.com/settings/developers> add an application。set `Authorization callback URL`  `http://localhost:8080/callback`.


modify `client_id` and `client_secret` in `util/config.js`。


### install dependencies

```
$ cd greedhub-front-end
$ npm install
```

### start

```
$ DEBUG=greedhub-front-end npm start
```

### browse

<http://localhost:2028>

## License

[MIT](LICESE)