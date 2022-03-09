import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser' 
import { routes } from './routes';
import { db_connector } from './helpers/db_connector';

//run database connection
db_connector().catch((err: Error) => {
  console.log(err);
  process.exit(1);
});

//  Middlewares
const app = express(); 
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true}))
app.use(express.json());

routes(app);

app.listen(3000, ()=>{
    console.log('listening on port 3000.');
})