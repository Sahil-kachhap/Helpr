const { gql, default: request } = require("graphql-request");

const master_url_key = process.env.NEXT_PUBLIC_MASTER_URL_KEY
const master_url = `https://api-ap-south-1.hygraph.com/v2/${master_url_key}/master`;

const getCategories = async () => {
  const query = gql`
    query Category {
        categories {
          bgcolor {
            hex
          }
          id
          name
          icon {
            url
          }
        }
      }      
    `

  const result = await request(master_url, query);
  return result;
}

const getBuisnessLists = async () => {
  const query = gql`
  query BuisnessList {
  buisnessLists {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    images {
      url
    }
    name
  }
}
  `

  const result = await request(master_url, query);
  return result;
}

const getBuisnessByCategory = async (category) => {
  const query = gql`
  query MyQuery {
    buisnessLists(where: {category: {name:"`+category+`"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }  
  `

  const result = await request(master_url, query);
  return result;
}

const getBuisnessByID = async (id) => {
  const query = gql`
  query GetBuisnessByID {
    buisnessList(where: {id: "`+id+`"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }  
  `

  const result = await request(master_url, query);
  return result;
}

const createBooking = async (buisnessId, date, time, name, email) => {
  console.log(`mutation: ${date}, ${time}, ${name}, ${email},${buisnessId}`)
  const mutationQuery = gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked, buisnessList: {connect: {id: "`+buisnessId+`"}}, date: "`+date+`", userEmail: "`+email+`", username: "`+name+`", time: "`+time+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }   
  `

  const result = await request(master_url, mutationQuery);
  return result;
}

const getBookedSlots = async (buisnessId, date) => {
  const query = gql`
  query BookedSlots {
    bookings(where: {buisnessList: {id: "`+buisnessId+`"}, date: "`+date+`"}) {
      date
      time
    }
  }  
  `

  const result = await request(master_url, query);
  return result;
}

const getBookings = async (email) => {
  const query = gql`
  query Bookings {
    bookings(where: {userEmail: "`+email+`"} orderBy: publishedAt_DESC
    ) {
      buisnessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
    }
  }  
  `

  const result = await request(master_url, query);
  return result;
}

export default {
  getCategories,
  getBuisnessLists,
  getBuisnessByCategory,
  getBuisnessByID,
  createBooking,
  getBookedSlots,
  getBookings
}
