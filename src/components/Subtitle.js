import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const SubtitleContainer = styled.h1`
	color: ${props => props.theme.colors.pink};
	font-family: ${props => props.theme.fonts.regular};
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.light};
	height: 33px;
	line-height: 33px;
	width: 233px;
`
const Subtitle = ({ text }) => <SubtitleContainer>{text}</SubtitleContainer>

Subtitle.propTypes = {
	text: PropTypes.string.isRequired,
}

export default Subtitle
