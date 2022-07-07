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
 - [ ] POST /register + POST /login
 - [ ] hash
 - [ ] salt
 - [ ] GET /me
 - [ ] POST /logout
 - [ ] update .env.example

Refactors: 
- [x] delete use strict
- [x] refactor leacking abtraction in index.js
- [x] refactor "/" endpoints
- [x] separate create and update functionalilies to separate endpoints
- [x] all endpoints should return with JSON or only with status code
- [x] imports fix
- [x] rip isDbAlive
- [x] pass SONGS as arguments // delete global songs