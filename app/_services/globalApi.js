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

export default {
  getCategories,
  getBuisnessLists,
  getBuisnessByCategory,
  getBuisnessByID
}
