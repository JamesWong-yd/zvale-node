import config from './config';
import mongoose form 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,config.options);
