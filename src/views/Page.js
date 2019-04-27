import React from "react"
import styled from "@emotion/styled"
import Header from "../components/Header"
import Nav from "../components/Nav"
import Location from "../components/Location"
import Date from "../components/Date"
import RSVP from "../components/RSVP"

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: ${props => props.theme.fonts.regular};
	height: 100%;
	justify-content: center;
	margin-bottom: 20%;
`

const Page = () => {
	return (
		<Container>
			<Header />
			<Nav />
			<Date id="when" />
			<Location id="where" />
			<RSVP id="rsvp" />
		</Container>
	)
}

export default Page
