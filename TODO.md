ToDo:

 - [x] .evn + .gitignore
 - [x] mongodb container to use .env file
 - [x] refactor index.js
 - [x] /models for CRUD
 - [x] /routes for CRUD
 - [x] favicon.ico serve as static file
 - [x] dockerize node app + .dockeringore
 - [x] seed w=/faker-js
 - [x] update relative path for favicon
 - [x] scripts/seed.js
 - [x] Auth endpoints
 - [x] POST /register + POST /login
 - [x] hash
 - [?] salt
 - [x] jwt token sign & return with login
 - [x] happi middleware to check and verify jwt tokens for auth protected routs -> [custom plugin guide](https://futurestud.io/tutorials/hapi-create-your-own-custom-plugin)
 - [ ] GET /me
 - [ ] POST /logout
 - [ ] update .env.example
 - [x] [Joi](https://joi.dev/api/?v=17.6.0) get to know
 - [x] JWT all around knowledge
 - [ ] Jest e2e testing, debugerest tesztek, sinon felületesen, hapi inject to test endpoints
 - [ ] gracefull shutdown startup

Refactors: 
- [x] delete use strict
- [x] refactor leacking abtraction in index.js
- [x] refactor "/" endpoints
- [x] separate create and update functionalilies to separate endpoints
- [x] all endpoints should return with JSON or only with status code
- [x] imports fix
- [x] rip isDbAlive
- [x] pass SONGS as arguments // delete global songs