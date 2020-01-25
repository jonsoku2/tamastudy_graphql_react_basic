# yarn add

```bash
$ yarn add express mongoose express-graphql lodash graphql body-parser
```

```bash
$ yarn add --dev nodemon
```

# package.json

```json
{
  "name": "api",
  "version": "1.0.0",
  "main": "server.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon ./server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-graphql": "^0.9.0",
    "graphql": "^14.5.8",
    "lodash": "^4.17.15",
    "mongoose": "^5.8.9"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
```
