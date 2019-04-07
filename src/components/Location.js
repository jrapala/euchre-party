import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 5%;
	width: 100%;
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-right: 15%;
	width: 50%;
`
const Title = styled.p`
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.bold};
	text-transform: uppercase;
`

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 24px;
	justify-content: flex-start;
	padding-right: 15%;
	width: 50%;
`

const Text = styled.p`
	align-items: left;
`
const Address = styled.a`
	align-items: left;
`

const Location = ({ id }) => (
	<Container id={id}>
		<TitleContainer>
			<Title>Where:</Title>
		</TitleContainer>
		<TextContainer>
			<Text>Paul and Juliette&apos;s</Text>
			<Address href="https://goo.gl/maps/6qTuDVg3T3y" target="_blank">
				425 W Surf St #903
			</Address>
			<Address href="https://goo.gl/maps/6qTuDVg3T3y" target="_blank">
				Chicago, IL 60657
			</Address>
		</TextContainer>
	</Container>
)

Location.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Location
