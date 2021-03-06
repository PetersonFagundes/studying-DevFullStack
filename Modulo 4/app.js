/*Imports */
import express from 'express';
import mongoose from 'mongoose';

import { studentRouter } from './routes/studentRouter.js';

require('dotenv').config();

const app = express();

/*Conexao com o MongoDB*/
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv:// ${process.env.USERDB}
      :
      ${process.env.PWDDB}@bootcampigti.lifgx.mongodb.net/trabalho_pratico?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log('Erro ao conectar no MongoDB');
  }
})();

app.use(express.json());
app.use(studentRouter);

app.listen(process.env.PORT, () => console.log('servidor API iniciado'));
