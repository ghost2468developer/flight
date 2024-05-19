const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Flight {
    id: ID!
    origin: String!
    destination: String!
    departureDate: String!
    returnDate: String
    price: String!
  }

  type Query {
    searchFlights(
      origin: String!
      destination: String!
      departureDate: String!
      returnDate: String
    ): [Flight]
  }
`

module.exports = typeDefs
