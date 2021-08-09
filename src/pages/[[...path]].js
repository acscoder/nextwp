import Head from 'next/head'
import Image from 'next/image'

import { getStaticPageSlug ,getPageByUri } from 'lib/pages';

function Page({page}) {
  return (
      <>
      <h1>{page.title}</h1>
       </>
  )
}
export const getStaticProps = async (context) => {
  var slug ='/'
  if(typeof context.params.path !=='undefined'){
    slug = context.params.path.join('/')
  }
  const data = await getPageByUri(slug)

  return {
    props: { page:data.page},
  }
}

export async function getStaticPaths() {
  const data = await getStaticPageSlug()

  return { paths:data.pages, fallback: 'blocking' }
}

export default Page;