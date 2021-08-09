import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache,ApolloProvider,useQuery,gql } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://emil.digitalonda.com/graphql",
  cache: new InMemoryCache(),
});

function Page(props) {
  return (
      <>
      <h1>{props.page.title}</h1>
        {props.page.content}
       </>
  )
}
export const getStaticProps = async (context) => {
  var slug ='/'
  if(typeof context.params.path !=='undefined'){
    slug = context.params.path.join('/')
  }

  const data = await apolloClient.query({
    query:gql`
    query MyQuery {
      page(id: "${slug}",idType: URI) {
        id
        title
        content
      }
    }
  `
  })

  return {
    props: { page:data.data.page },
    revalidate: 1,
  }
}


export async function getStaticPaths() {

  const data = await apolloClient.query({
    query:gql`
    query MyQuery {
      pages(first:30) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `
  })

  const pages_slug = data.data.pages.edges.map(edge=>(
      '/'+edge.node.slug
  ))

  return { paths:pages_slug, fallback: 'blocking' }

}
export default Page;