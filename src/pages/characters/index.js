import styled from "styled-components"


function CharactersPage({characters}) {

  return <>
  TEST 
  </>
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://develop.d3t5w79d05f5ds.amplifyapp.com/api/characters')
  const posts = await res.json()

  /* By returning { props: { characters } }, the Blog component
     will receive `posts` as a prop at build time
  */
  return {
    props: {
      characters:posts,
    },
  }
}

export default CharactersPage