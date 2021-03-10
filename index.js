import express from 'express';
import apiv1Router from './server/v1/routes/';
import apiv2Router from './server/v2/routes/';
import swaggerUi from 'swagger-ui-express';
import docs from './swagger.json';
import Sequelize from 'sequelize';

const app = express();
const docsUrl = 'https://free-mentors-app.herokuapp.com/api/v1/api-docs/';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//intialize routes vesrion 1
app.use('/api/v1',apiv1Router);

//intialize routes vesrion 2
app.use('/api/v2',apiv2Router);

//intialize endpoint of api documatation  of vesrion 1
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
//intialize endpoint of api documatation  of vesrion 1
app.use('/api/v2/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.get('/',(req, res, next) => res.status(200).send({
  status : 200,
  message : 'welcome to the Free mentor Api, below link is how to use it',
  documentation : `For the documentaion visit this link ${docsUrl}`,
}));

app.use('**', (req, res) => res.status(405).send({
  status : 405,
  message : `The requested resource was not found on the server, Visit the documentation link ${docsUrl}`
}));

const db = new Sequelize('free-mentor', 'postgres', 'johnkey', {
  host: 'localhost',
  dialect:'postgres',
});

db.authenticate()
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error '+err));
const test = async()=>{
  try{
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();


//listen for requests
app.listen(process.env.PORT || 3000,function(){
  console.log('Now listening for request on port 3000');
});
export default app;