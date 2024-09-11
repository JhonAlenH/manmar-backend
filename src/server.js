import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';

import v1AuthRouter from './v1/authRoutes.js';
import v1ValrepRouter from './v1/valrepRoutes.js';
import v1EmissionRouter from './v1/emissionRoutes.js';
import v1EstadosRouter from './v1/estadosRoutes.js';
import v1MaestrosRouter from './v1/maestrosRoutes.js';

const { diskStorage } = multer;

const app = express(); 
dotenv;

app.use(cors({
  origin: '*',  // o especifica el dominio permitido
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true ,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-channel'],
  
}));

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/valrep", v1ValrepRouter);
app.use("/api/v1/emission", v1EmissionRouter);
app.use("/api/v1/estado", v1EstadosRouter);
app.use("/api/v1/maestros", v1MaestrosRouter);

const PORT = process.env.PORT || 3000; 

const DOCUMENTS_PATH = './public/documents';
const DOCUMENTS_PATH2 = '/api/get-document/';

app.get('/api/get-document/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(DOCUMENTS_PATH, filename);
  const absolutePath = path.resolve(filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    } else {
      res.sendFile(absolutePath);
    }
  });
});

app.listen(PORT, () => { 
  console.log(`\n API is listening on port ${PORT}`);
});

const document_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DOCUMENTS_PATH);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

let document_upload = multer({
    storage: document_storage,
    limits: {
      fileSize: 35000000
    },
    fileFilter(req, file, cb) {
      cb(null, true);
    }
});

app.post('/api/upload/documents', document_upload.array('file', 5), (req, res) => {
  const files = req.body;
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;
    console.log(error.message)
    return res.status(400).json({ data: { status: false, code: 400, message: error.message } });
  }
  const absolutePath = DOCUMENTS_PATH2 + files.url + '/' + files.fileName;

//   const uploadedFiles = files.map(file => ({ filename: file.filename }));

  res.json({ data: { status: true, uploadedFile: files, url: absolutePath } });
});

app.post('/api/upload/document/emission', document_upload.array('file', 5), (req, res) => {
  const files = req.body;
  console.log(files)
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;
    console.log(error.message)
    return res.status(400).json({ data: { status: false, code: 400, message: error.message } });
  }
  const absolutePath = DOCUMENTS_PATH2 + files.fileName;

//   const uploadedFiles = files.map(file => ({ filename: file.filename }));

  res.json({ data: { status: true, uploadedFile: files, url: absolutePath } });
});

app.post('/api/upload/image', document_upload.array('image'),(req, res , err) => {
  const files = req.file;
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;

    return res.status(400).json({  status: false, code: 400, message: error.message  });
  }

  res.json({  status: true, uploadedFile: files  });
});