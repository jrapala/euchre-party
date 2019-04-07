import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const TitleContainer = styled.h1`
	color: ${props => props.theme.colors.white};
	font-family: ${props => props.theme.fonts.regular};
	font-size: 37.5px;
	font-weight: ${props => props.theme.fontWeights.medium};
	width: 280px;
	height: 52px;
`
const Title = ({ text }) => <TitleContainer>{text}</TitleContainer>

Title.propTypes = {
	text: PropTypes.string.isRequired,
}

export default Title
