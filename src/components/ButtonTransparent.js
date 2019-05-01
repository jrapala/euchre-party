import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

const propTypes = {
	large: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	margin: PropTypes.string,
	text: PropTypes.string.isRequired,
}

const defaultProps = {
	large: false,
	margin: "0 auto",
}

const Button = styled.button`
	&:hover {
		color: ${props => props.theme.colors.white};
		background-color: ${props => props.theme.colors.blue};
	}
	background-color: transparent;
	border: 2px solid ${props => props.theme.colors.blue};
	border-radius: 5px;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
	color: ${props => props.theme.colors.blue};
	cursor: pointer;
	font-size: ${props => (props.large ? "24px" : "14px")};
	font-weight: ${props => props.theme.fontWeights.bold};
	letter-spacing: ${props => (props.large ? "2px" : "0px")};
	margin: ${props => props.margin};
	padding: ${props => (props.large ? "10px" : "8px")};
	width: ${props => (props.large ? "200px" : "100px")};
	transition: all 0.25s ease;
`

const ButtonTransparent = React.forwardRef(
	({ large, margin, onClick, text }, ref) => (
		<Button ref={ref} onClick={onClick} large={large} margin={margin}>
			{text}
		</Button>
	)
)

ButtonTransparent.propTypes = propTypes
ButtonTransparent.defaultProps = defaultProps

export default ButtonTransparent
