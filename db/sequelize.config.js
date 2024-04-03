import fs from 'fs';
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  username: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PG_DB,
  host: 'localhost',
  dialect: 'postgres',
});

export const sequelizeInit = () => {

  const schemaSQL = fs.readFileSync('db/seeders/schema.sql', 'utf8');
  const dataSQL = fs.readFileSync('db/seeders/data.sql', 'utf8');

  // Execute schema.sql to create tables
  sequelize.query(schemaSQL)
    .then(() => {
      console.log('Schema SQL executed successfully');
      // Execute data.sql to insert data
      return sequelize.query(dataSQL);
    })
    .then(() => {
      console.log('Data SQL executed successfully');
    })
    .catch((err) => {
      console.error('Error executing SQL:', err);
    });
}

export const dropTablesOnExit = async (signal) => {
  console.log(`Received ${signal}, shutting down...`);

  const dropSQL = fs.readFileSync('db/seeders/drop.sql', 'utf8');
  // Execute drop.sql to drop tables
  await sequelize.query(dropSQL)
    .then(() => {
      console.log('Drop SQL executed successfully');
    })
    .catch((err) => {
      console.error('Error executing SQL:', err);
    });

  process.exit(0); // Exit the process
};
