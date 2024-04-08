import express from 'express';
import 'dotenv/config'
import { connectDb } from './config/dbConnection.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors'
import roleRoutes from './routes/roleRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import designationRoutes from './routes/designationRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

connectDb();
const app = express();
const port = process.env.PORT || 5000
var corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/desingations', designationRoutes);
app.use('/api/employees', employeeRoutes);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`sso-client is running on ${port}`);
})
