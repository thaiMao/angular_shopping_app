'use strict';
require('dotenv').config();
const express = require('express');
const request = require('request');
const path = require('path');
const cors = require('cors');

const getTescoData = require('../data/connectors/tesco');
const Schema = require('../data/schema');
const Resolvers = require('../data/resolvers');
const apolloExpress = require('apollo-server').apolloExpress;
const graphiqlExpress = require('apollo-server').graphiqlExpress;
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const bodyParser = require('body-parser');
const chargeCard = require('../payments/stripe');
const PORT = 8080;
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowUndefinedInResolve: false,
  printErrors: true
});

app.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
  context: {}
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.post('/payment', chargeCard);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});

