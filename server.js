import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './config/db-config';
import logger from './config/log';
import routes from './routes/index';
import Props from './util/api-properties';
import fs from 'fs';
import cors from 'cors';

const app = express();

const router = express.Router();

app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent', 
{ stream: { write: message => logger.info(message.trim()) }}));
app.use(router);

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({extended: true,limit: '50mb'}));
router.use(cors());
router.options('*', cors());

//require('./routes/index')(router);


require('./routes/index')(router);
require('./routes/child-routes')(router);
require('./routes/transaction-routes')(router);
require('./exceptions/error-middleware')(router);

let imgUploadingDir = Props.imageRefPath.uploadPath;
let imgHostingDir = Props.imageRefPath.hostingPath;
if (!fs.existsSync(imgHostingDir)) {
fs.mkdirSync(imgHostingDir);
}
if (!fs.existsSync(imgUploadingDir)) {
fs.mkdirSync(imgUploadingDir);
}
router.use(express.static(imgHostingDir));
router.use(express.static(__dirname+'/public'));

app.listen(8080, () => logger.info('Server is listening on port: 8080'));