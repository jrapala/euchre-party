import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faQuestion } from "@fortawesome/free-solid-svg-icons"

const Button = styled.button`
	background-color: transparent;
	border: 1px solid ${props => props.color};
	color: ${props => props.color};
	cursor: pointer;
	display: flex;
	font-size: 14px;
	font-weight: ${props => props.theme.fontWeights.regular};
	justify-content: space-evenly;
	margin: 5px;
	outline: none;
	padding: 2px;
	width: 240px;
	text-transform: capitalize;
	transition: all 0.25s ease;
	&:hover {
		border: 1px solid ${props => props.hoverColor};
		color: ${props => props.hoverColor};
	}
`

const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 18px;
`

const ButtonWithIcon = ({ onClick, rsvpSelection, type }) => {
	let color = "#b4b3be"
	let hoverColor
	let text
	let icon

	switch (type) {
		case "yes":
			hoverColor = "#23aa23"
			icon = faCheck
			text = "Yes"
			if (rsvpSelection === "yes") {
				color = hoverColor
			}
			break
		case "no":
			hoverColor = "#d8151f"
			icon = faTimes
			text = "No"
			if (rsvpSelection === "no") {
				color = hoverColor
			}
			break
		case "maybe":
			hoverColor = "#eded1a"
			icon = faQuestion
			text = "Maybe"
			if (rsvpSelection === "maybe") {
				color = hoverColor
			}
			break
		default:
			break
	}

	return (
		<Button hoverColor={hoverColor} color={color} onClick={onClick}>
			<StyledIcon icon={icon} />
			<div>{text}</div>
		</Button>
	)
}

ButtonWithIcon.propTypes = {
	onClick: PropTypes.func.isRequired,
	rsvpSelection: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export default ButtonWithIcon
