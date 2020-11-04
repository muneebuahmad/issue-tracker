####TO DO in the Future

- [ ] Make it so that users can be mentioned in comments (maybe by migrating a new column into the comment table by using an array for multiple user ids)

---

####Things to use on the backend

- [x] Docker (as a container)
- [x] DotEnv (to access .env file)
- [x] NodeJS
- [x] PostgreSQL (the database)
- [x] Knex.js (query builder and migrations)
- [ ] Objection.js (ORM for defining models)
- [ ] Joi (API schema validation)

---

####Entities to model:

- [x] user
- [x] priority
- [x] project
- [x] category
- [x] status
- [x] issue
- [x] comment

---

####Every record will have (in order to have soft deletes):

- Created At - datetime
- Updated At - datetime
- Deleted At - datetime

---

####Backend Setup:

- Run `npm install` to install dependencies
- Make an `.env`, file replacing values in the .env.sample file
- Start the Docker container by running `docker-compose up` (this is for PostgreSQL and Adminer)
- Migrate the database by running `npm run migrate`
- Seed the database by running `npm run seed`
- Login to adminer at http://localhost:8080
  - Remember to set the system in adminer to 'PostgreSQL', and server to 'db'
