import { GraphQLClient } from 'graphql-request'

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY

const StorefrontClient = new GraphQLClient(
  `https://${storeDomain}/api/2021-10/graphql.json`,
  {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
  },
)

const StorefrontApi = {
  request: ({ query, variables }) => StorefrontClient.request(query, variables),
}

export default StorefrontApi
