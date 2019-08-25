import express from 'express';
import routes from './server/v1/routes/';
import helper from './server/v1/helpers/general';
import swaggerUi from 'swagger-ui-express';
import docs from './swagger.json';

const app = express();
const guider = helper.todo;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//intialize routes vesrion 1
app.use('/api/v1',routes);

//intialize endpoint of api documatation  of vesrion 1
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.get('/',(req, res, next) => res.status(200).send({
  status : 200,
  message : 'welcome to the Free mentor Api, below is how to use it',
  guider
}));

app.use('**', (req, res) => res.status(404).send({
  status : 404,
  message : 'The requested resource was not found on the server'
}));

//listen for requests
app.listen(process.env.PORT || 3000,function(){
  console.log('Now listening for request on port 3000');
});
export default app;


  