import styled from "styled-components"
import Link from 'next/link'
import { BiLeftArrow } from "react-icons/bi";
import { HiCursorClick } from "react-icons/hi"
import { MdTouchApp } from "react-icons/md"

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
    margin: 2rem 1rem;
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
  border-radius: 1rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
	cursor: pointer;

  position: relative;
  &:hover ${Overlay} {
    height: 100%;
  }
`

const CharacterImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 25rem;

  @media (max-width: 599px) {
    height: 35rem;
  }
`;

const CharacterDetailContainer = styled.div`
  padding: 1rem;
  white-space: nowrap; 
  color: white;
  font-size: 1.3rem;
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

const NameBox = styled.div`
	padding: .5rem;
	white-space: nowrap; 
	color: white;
	font-size: 1.3rem;
	background-color: #008CBA;
`

const StyledLink = styled(Link)`
	font-size: 1.5rem;
	padding: 0rem 1rem;
	letter-spacing: .1rem;
  text-align: center;
  color: #FFF;
  text-decoration: none;
	display: flex;
	align-items: end;
	max-width: 11rem;
  
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

const HoverIcon = styled.div`
	position: absolute;
	top: 0%;
	left: 0%;
	padding: 0.4rem 0.5rem;
	border-radius: 1rem;
	color: #FFF;
	background: #000;
	margin: .2rem 0rem 0rem .2rem;
`

const DesktopHoverIcon = styled(HoverIcon)`
	display: block;

	@media (max-width: 960px) {
		display: none;
	}
`

const MobileTouchIcon = styled(HoverIcon)`
	display: none;

	@media (max-width: 960px) {
		display: block;
	}
`

function CharactersPage({characters}) {
  return <>
    <Wrap>
        <StyledLink href="/"><BiLeftArrow/>&nbsp;Home</StyledLink>
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
							<DesktopHoverIcon>
								<HiCursorClick size={15}/>
							</DesktopHoverIcon>
							<MobileTouchIcon>
								<MdTouchApp/>
							</MobileTouchIcon>
							<NameBox>
									{char.name}
							</NameBox>
							<Overlay>
									<CharacterDetailContainer>
											{char.name}
											<CharacterDetailBox>height: {char.height}</CharacterDetailBox>
											<CharacterDetailBox>weight: {char.mass}</CharacterDetailBox>
											<CharacterDetailBox>hair color: {char.hair_color}</CharacterDetailBox>
											<CharacterDetailBox>skin tone: {char.skin_color}</CharacterDetailBox>
											<CharacterDetailBox>eye color: {char.eye_color}</CharacterDetailBox>
											<CharacterDetailBox>birth year: {char.birth_year}</CharacterDetailBox>
											<CharacterDetailBox>gender: {char.gender}</CharacterDetailBox>
									</CharacterDetailContainer>
							</Overlay>
            </CharacterContainer>
        </CharacterBox>)}
        </Container>
    </Wrap>
  </>
}

// This function gets called at build time on server-side.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://develop.d3t5w79d05f5ds.amplifyapp.com/api/characters')
  const posts = await res.json()

  /* By returning { props: { characters } }, the CharactersPage component
     will receive `posts` as a prop at build time
  */
  return {
    props: {
      characters:posts,
    },
  }
}

export default CharactersPage