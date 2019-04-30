import React from "react"
import styled from "@emotion/styled"
import Header from "../components/Header"
import Nav from "../components/Nav"
import InfoSection from "../components/InfoSection"
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
			<InfoSection id="when" />
			<InfoSection id="where" />
			<RSVP id="rsvp" />
		</Container>
	)
}

export default Page
