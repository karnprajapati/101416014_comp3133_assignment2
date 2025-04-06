const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Fix: Return full URL so Angular can load the image
app.post('/upload', upload.single('profilePic'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const protocol = req.protocol;
  const host = req.get('host'); // e.g., localhost:4000
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  
  res.json({ url: fileUrl });
});

// GraphQL server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.get('/', (req, res) => {
    res.redirect('/graphql');
  });
  

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(
    'mongodb+srv://admin:MongoDB@cluster0.0mqlv.mongodb.net/assignment2_comp3133?retryWrites=true&w=majority&appName=Cluster0',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log('✅ Connected to MongoDB');
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
