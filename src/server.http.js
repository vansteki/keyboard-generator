import express from 'express';
import httpModule from 'http';
import path from 'path';

const app = express();
app.use(express.static(path.resolve(__dirname, '../www')))

const http = httpModule.createServer(app);

export default http;
