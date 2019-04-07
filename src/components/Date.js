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

const Add = styled.a`
	font-size: 14px;
`

const Date = ({ id }) => (
	<Container id={id}>
		<TitleContainer>
			<Title>When:</Title>
		</TitleContainer>
		<TextContainer>
			<Text>Saturday, May 11, 2019</Text>
			<Text>5:30pm-10:30pm</Text>
			<Add
				href="http://www.google.com/calendar/event?action=TEMPLATE&dates=20190511T223000Z%2F20190512T033000Z&text=Paul%20%26%20Juliette's%20Euchre%20Party!&location=425%20W%20Surf%20St%20%23903%20Chicago%2C%20IL%2060657&details="
				target="_blank"
				rel="nofollow"
			>
				Add to Google calendar
			</Add>
		</TextContainer>
	</Container>
)

Date.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Date
