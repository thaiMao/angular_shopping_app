const tescoData = require('./connectors/tesco');
const orders = require('./connectors/orders');
const sessions = require('./connectors/sessions');
var GraphQLScalarType = require('graphql').GraphQLScalarType;
var Kind = require('graphql/language');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),

  Query: {
    getTescoItems(root, args) {
      return tescoData.getData(args);
    },
    getOrders(root, args) {
      return orders.getOrders();
    },
    getSessions(root, args) {
      return sessions.getSessions();
    }
  },
  Mutation: {
    createOrder(root, args) {
      return orders.createOrder(args);
    },
    createSession(root, args) {
      return sessions.createSession(args);
    },
    updateSession(root, args) {
      return sessions.updateSession(args);
    }
  }
};

module.exports = resolvers;
