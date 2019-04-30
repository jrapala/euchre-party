import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import Date from "./Date"
import Location from "./Location"

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 5%;
	width: 100%;
	@media (max-width: 768px) {
		align-items: center;
		flex-direction: column;
	}
`

const TextContainer = styled.div`
	align-items: left;
	display: flex;
	flex-direction: column;
	font-size: 24px;
	justify-content: flex-start;
	padding-right: 15%;
	width: 50%;
	@media (max-width: 768px) {
		align-items: center;
		flex-direction: column;
		margin-top: 10px;
		padding: 0;
		width: 100%;
	}
`

const Title = styled.p`
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.bold};
	text-transform: uppercase;
`

const TitleContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-right: 15%;
	width: 50%;
	@media (max-width: 768px) {
		align-items: center;
		flex-direction: column;
		padding: 0;
		width: 100%;
	}
`

const InfoSection = ({ id }) => (
	<Container id={id}>
		<TitleContainer>
			<Title>{id}:</Title>
		</TitleContainer>
		<TextContainer>{id === "when" ? <Date /> : <Location />}</TextContainer>
	</Container>
)

InfoSection.propTypes = {
	id: PropTypes.string.isRequired,
}

export default InfoSection