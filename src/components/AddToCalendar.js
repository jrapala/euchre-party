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

const Text = styled.div`
	margin-top: 2px;
`

const AddToCalendar = () => (
	<StyledButton
		onClick={() =>
			window.open(
				"http://www.google.com/calendar/event?action=TEMPLATE&dates=20190511T223000Z%2F20190512T033000Z&text=Paul%20%26%20Juliette's%20Euchre%20Party!&location=425%20W%20Surf%20St%20%23903%20Chicago%2C%20IL%2060657&details=",
				"_blank"
			)
		}
	>
		<StyledIcon icon={faCalendarPlus} />
		<Text>Add to Google Calendar</Text>
	</StyledButton>
)

export default AddToCalendar
