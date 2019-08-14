import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes';
import todo from './server/helpers/general';

const app = express();
const guider = todo.todo;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//intialize routes
app.use('/api',routes);

//errors handling middleware
app.use(function(error,req,res,next){
    res.status(422).send({error:error.message});
 });

 app.get('/',(req, res, next) => res.status(200).send({
    status : 200,
    message : "welcome to the Free mentor Api, below is how to use it",
    guider
}));

app.use('**', (req, res) => res.status(404).send({
    status : 404,
    message : "The requested resource was not found on the server"
}));

//listen for requests
app.listen(process.env.port || 3000,function(){
    console.log('Now listening for request on port 3000');
 });

  