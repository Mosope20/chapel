import express from 'express';
import 'dotenv/config';
import path from 'path';
import userRoutes from './routes/route.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const PORT = process.env.PORT || 3030

app.use('',userRoutes)

app.listen(PORT, ()=> console.log(`server is running on http://localhost:${PORT}`))