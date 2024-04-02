import app from './app.js'
import dotenv from "dotenv";

import path from "path";
const __dirname = path.resolve();

dotenv.config();
const PORT = process.env.DEV_PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})