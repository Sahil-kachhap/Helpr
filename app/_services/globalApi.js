const { gql, default: request } = require("graphql-request");

const master_url_key=process.env.NEXT_PUBLIC_MASTER_URL_KEY
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

export default {
    getCategories
}
