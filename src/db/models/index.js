'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};
const Umzug=require('umzug');


// define our database connection using the sequelize object.
let sequelize = new Sequelize({
  host: config.host,
  username: config.username,
  password: config.password,
  port: config.port,
  database: config.database,
  dialect: config.dialect,
});

// Testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!!");
    // find list of all tables in database
  })
  .catch((err) => {
    console.log("Error while connecting dataabase ==>>>>", err);
  });

  sequelize
  .query("SELECT table_name FROM information_schema.tables")
  .then((tables) => {
    console.log("List of all tables in database ==>>", tables);
  }
  )
  .catch((err) => {
    console.log("Error while fetching list of all tables in database ==>>", err);
  });

  // const umzug = new Umzug({
  //   storage: 'sequelize', // Use sequelize storage
  //   storageOptions: {
  //     sequelize: sequelize, // Pass the sequelize instance
  //   },
  //   migrations: {
  //     path: path.join(__dirname, 'migrations'), // Directory containing migration files
  //     params: [sequelize.getQueryInterface(), Sequelize], // Additional parameters passed to migrations
  //   },
  // });
  
  // // Perform migrations
  // async function runMigrations() {
  //   try {
  //     const pendingMigrations = await umzug.pending();
  //     if (pendingMigrations.length > 0) {
  //       await umzug.up(); // Apply pending migrations
  //       console.log('Migrations have been executed successfully.');
  //     } else {
  //       console.log('No pending migrations.');
  //     }
  //   } catch (error) {
  //     console.error('Error executing migrations:', error);
  //   }
  // }



// // model associations
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// model associations 
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.demo = require('./demo')(sequelize, Sequelize);
db.milantest = require('./milantest')(sequelize, Sequelize);

// model associations write here

module.exports = db;