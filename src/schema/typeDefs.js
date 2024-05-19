const { gql, GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const FlightType = new GraphQLObjectType({
  name: 'Flight',
  fields: () => ({
    id: { type: GraphQLID },
    origin: { type: GraphQLString },
    destination: { type: GraphQLString },
    departureDate: { type: GraphQLString },
    returnDate: { type: GraphQLString },
    price: { type: GraphQLString }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    searchFlights: {
      type: new GraphQLList(FlightType),
      args: {
        origin: { type: GraphQLString },
        destination: { type: GraphQLString },
        departureDate: { type: GraphQLString },
        returnDate: { type: GraphQLString }
      },
      resolve: async (_, { origin, destination, departureDate, returnDate }) => {
        return [
          {
            id: '1',
            origin,
            destination,
            departureDate,
            returnDate,
            price: '$500'
          }
        ]
      }
    }
  }
})

module.exports = {
  typeDefs: gql`
    ${QueryType}
  `
}