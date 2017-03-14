const typeDefinitions = `
  scalar Date

  type tescoItem {
    image: String
    tpnb: Int
    price: Float
    PromotionDescription: String
    ContentsMeasureType: String
    name: String
    UnitOfSale: Int
    AverageSellingUnitWeight: Int
    description: [String]
    UnitQuantity: String
    ContentsQuantity: Int
    unitprice: Int
  }
  input ProductInput {
    name: String
    price: Float
    image: String
    description: [String]
    quantity: Int
    __typename: String
  }
  type Product {
    name: String
    price: Float
    image: String
    description: [String]
    quantity: Int

  }
  input OrderInput {
    total: Float
    cart: [ProductInput]
    sessionId: Int
    date: Date
  }
  type Order {
    id: Int
    total: Float
    cart: [Product]
    sessionId: Int
    date: Date
  }
  type Session {
    id: Int
    searchedTerms: [String]
    addedToCart: [Product]
    date: Date
  }
  input SessionInput {
    id: Int
    searchedTerms: [String]
    addedToCart: [ProductInput]
    date: Date
  }
  type Query {
    getTescoItems(term: String): [tescoItem]
    getOrders(id: Int): [Order]
    getSessions(id: Int): [Session]
  }
  type Mutation {
    createOrder(total: Float, cart: [ProductInput], sessionId: Int, date: Date): Order
    createSession(id: Int, searchedTerms: [String], addedToCart: [ProductInput], date: Date): Session
    updateSession(id: Int, searchedTerms: [String], addedToCart: [ProductInput], date: Date): String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = [typeDefinitions];
