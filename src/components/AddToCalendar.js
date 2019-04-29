import React from "react"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons"

const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 20px;
	margin-right: 10px;
`

const StyledButton = styled.button`
	&:hover {
		background-color: ${props => props.theme.colors.darkBlue};
	}
	align-items: center;
	background-color: ${props => props.theme.colors.blue};
	border: none;
	color: ${props => props.theme.colors.white};
	cursor: pointer;
	display: flex;
	font-family: ${props => props.theme.fonts.regular};
	font-size: 12px;
	height: 36px;
	margin-top: 10px;
	text-transform: uppercase;
	width: 210px;
`

const AddToCalendar = () => (
	<StyledButton
		onClick={() => window.open(process.env.GOOGLE_CALENDAR_LINK, "_blank")}
	>
		<StyledIcon icon={faCalendarPlus} />
		<div>Add to Google Calendar</div>
	</StyledButton>
)

export default AddToCalendar
