require('dotenv').config()
const Amadeus = require('amadeus')

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
})

const resolvers = {
  Query: {
    searchFlights: async (_, { origin, destination, departureDate, returnDate }) => {
      try {
        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate,
          returnDate,
          adults: '1',
        });

        return response.data.map(flight => ({
          id: flight.id,
          origin: flight.itineraries[0].segments[0].departure.iataCode,
          destination: flight.itineraries[0].segments[0].arrival.iataCode,
          departureDate: flight.itineraries[0].segments[0].departure.at,
          returnDate: returnDate ? flight.itineraries[1]?.segments[0].departure.at : null,
          price: flight.price.total,
        }));
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching flight data')
      }
    }
  }
}

module.exports = resolvers
