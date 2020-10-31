####TO DO in the Future

- [ ] Make it so that users can be mentioned in comments (maybe by migrating a new column into the comment table by using an array for multiple user ids)

---

####Things to use on the backend

- [ ] Docker (as a container)
- [ ] DotEnv (to access .env file)
- [ ] NodeJS
- [ ] PostgreSQL (the database)
- [ ] Knex.js (query builder and migrations)
- [ ] Objection.js (ORM for defining models)
- [ ] Joi (API schema validation)

---

####Entities to model:

- [ ] user
- [ ] priority
- [ ] project
- [ ] category
- [ ] status
- [ ] issue
- [ ] comment

---

####Every record will have (in order to have soft deletes):

- Created At - datetime
- Updated At - datetime
- Deleted At - datetime

---

####To start the server:

- Run npm install to install dependencies
- Make an .env file replacing values in the .env.sample file
- Docker-compose up
- Login to adminer at localhost:8080
  - Remember to set the system in adminer to 'PostgreSQL', and server to 'db'

---

####To run migrations:

- npm run migrate (npm run rollback to rollback the migrations)
