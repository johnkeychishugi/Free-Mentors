import express from 'express';
import routes from './server/v1/routes/';
import swaggerUi from 'swagger-ui-express';
import docs from './swagger.json';

const app = express();
const docsUrl = 'https://free-mentors-app.herokuapp.com/api/v1/api-docs/';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//intialize routes vesrion 1
app.use('/api/v1',routes);

//intialize endpoint of api documatation  of vesrion 1
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.get('/',(req, res, next) => res.status(200).send({
  status : 200,
  message : 'welcome to the Free mentor Api, below link is how to use it',
  documentation : `For the documentaion visit this link ${docsUrl}`,
}));

app.use('**', (req, res) => res.status(405).send({
  status : 405,
  message : `The requested resource was not found on the server, Visit the documentation link ${docsUrl}`
}));

//listen for requests
app.listen(process.env.PORT || 3000,function(){
  console.log('Now listening for request on port 3000');
});
export default app;


  