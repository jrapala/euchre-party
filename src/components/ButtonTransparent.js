import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const Button = styled.button`
	background-color: transparent;
	border: 2px solid ${props => props.theme.colors.blue};
	border-radius: 5px;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
	color: ${props => props.theme.colors.blue};
	cursor: pointer;
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.bold};
	padding: 10px;
	width: 200px;
	transition: all 0.25s ease;
	letter-spacing: 2px;
	&:hover {
		color: ${props => props.theme.colors.white};
		background-color: ${props => props.theme.colors.blue};
	}
`

const ButtonTransparent = ({ onClick, text }) => (
	<Button onClick={onClick}>{text}</Button>
)

ButtonTransparent.propTypes = {
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
}

export default ButtonTransparent
