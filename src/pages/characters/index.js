import styled from "styled-components"

const Wrap = styled.div`
  margin: 2rem 0rem;
  height: auto;
  overflow: auto;
`
const Container = styled.div`
  overflow: scroll;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const CharacterBox = styled.div`
  margin: 1rem;

  @media (min-width: 1300px) {
    width: 20%;
  }

  @media (max-width: 1100px) {
    width: 29%;
  }

  @media (max-width: 950px) {
    width: 38%;
  }

  @media (max-width: 600px) {
    width: 40%;
  }

  @media (max-width: 599px) {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #008CBA;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: .5s ease;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`

const CharacterContainer = styled.div`
  color: #000;
  font-size: 1rem;
  font-family: monospace;
  // background: #FFF;
  border-radius: 1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;

  position: relative;
  &:hover ${Overlay} {
    height: 100%;
  }
`

const CharacterImage = styled.img`
  // height: 20rem;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 25rem;

  @media (max-width: 599px) {
    height: 35rem;
  }
`;

const CharacterNameBox = styled.div`
  padding: 1rem;
  white-space: nowrap; 
  color: white;
  font-size: 1.5rem;
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const CharacterDetailBox = styled.div`
  font-size: 1rem;
`


function CharactersPage({characters}) {
  console.log(characters, "props")

  return <>
    <Wrap>
        <Container>
        {characters.map((char, index) => 
        <CharacterBox key={index}>
            <CharacterContainer >
            <CharacterImage
                src={char.image}
                alt={char.name}
                width={180}
                height={37}
                priority
            />
            <Overlay>
                <CharacterNameBox>
                {char.name}
                <CharacterDetailBox>height: {char.height}</CharacterDetailBox>
                <CharacterDetailBox>weight: {char.mass}</CharacterDetailBox>
                <CharacterDetailBox>hair color: {char.hair_color}</CharacterDetailBox>
                <CharacterDetailBox>skin tone: {char.skin_color}</CharacterDetailBox>
                <CharacterDetailBox>eye color: {char.eye_color}</CharacterDetailBox>
                <CharacterDetailBox>birth year: {char.birth_year}</CharacterDetailBox>
                <CharacterDetailBox>gender: {char.gender}</CharacterDetailBox>
                </CharacterNameBox>
            </Overlay>
            </CharacterContainer>
        </CharacterBox>)}
        </Container>
    </Wrap>
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