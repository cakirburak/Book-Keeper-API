import app from './app.js'
import dotenv from "dotenv";
import { sequelizeInit, dropTablesOnExit } from "../db/sequelize.config.js"

// initialize postgres with provided tables and data
const sequelize = sequelizeInit();

// listen exit signal to drop tables on exit
process.on('exit', async (code) => {
  console.log(`About to exit with code: ${code}`);
});
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => dropTablesOnExit(signal, sequelize));
});

dotenv.config();
const PORT = process.env.DEV_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})