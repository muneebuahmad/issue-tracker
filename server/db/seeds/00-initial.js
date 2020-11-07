const tableNames = require('../../src/constants/tableNames');
const orderedTableNames = require('../../src/constants/orderedTableNames');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.seed = async (knex) => {
  // First we delete all data in the tables. We use the ordered table names to delete
  // them in an order that we don't run into table dependency issues.
  await orderedTableNames.reduce(async (promise, tableName) => {
    await promise;
    console.warn('Clearing ', tableName);
    return knex(tableName).del();
  }, Promise.resolve());

  // Seed the user table
  const password = crypto.randomBytes(20).toString('hex');
  const user = {
    id: 0,
    first_name: 'Muneeb',
    last_name: 'Ahmad',
    email: 'muneebuahmad@gmail.com',
    password: await bcrypt.hash(password, 12),
  };
  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  if (process.env.NODE_ENV !== 'test') {
    console.log(
      'User created: ',
      {
        password,
      },
      createdUser,
    );
  }

  // Seed the project table
  const project = {
    id: 0,
    key: 'SAMPLE',
    name: 'Sample Project',
    user_id: 0,
  };
  const [createdProject] = await knex(tableNames.project)
    .insert(project)
    .returning('*');

  console.log('Project created:', createdProject);

  // Seed the category table
  const createdCategories = await knex(tableNames.category).insert([
    {
      project_id: 0,
      name: 'Bug',
    },
    {
      project_id: 0,
      name: 'Issue',
    },
  ]);
  createdCategories
    ? console.log('Categories created')
    : console.warn('Categories seeding failed');

  // Seed the status table
  const createdStatuses = await knex(tableNames.status).insert([
    {
      project_id: 0,
      name: 'To Do',
      order: 1,
    },
    {
      project_id: 0,
      name: 'In Progress',
      order: 2,
    },
    {
      project_id: 0,
      name: 'Testing',
      order: 3,
    },
    {
      project_id: 0,
      name: 'Complete',
      order: 4,
    },
  ]);
  createdStatuses
    ? console.log('Statuses created')
    : console.warn('Statuses seeding failed');

  // Seed the priority table
  const createdPriorities = await knex(tableNames.priority).insert([
    {
      name: 'Low',
    },
    {
      name: 'Medium',
    },
    {
      name: 'High',
    },
    {
      name: 'Critical',
    },
  ]);
  createdPriorities
    ? console.log('Priorities created')
    : console.warn('Priorities seeding failed');
};
