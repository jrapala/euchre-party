import React from "react"
import styled from "@emotion/styled"

import Header from "../components/Header"
import Nav from "../components/Nav"
import Location from "../components/Location"
import Date from "../components/Date"
import RSVP from "../components/RSVP"
// import { auth, uiConfig } from "./../components/Firebase"
// import Firebase from "./../components/Firebase"
// import { FirebaseContext } from "../components/Firebase"

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
			{/* <SignUpForm /> */}
			{/* <FirebaseContext.Consumer>
				{firebase => {
					// Configure FirebaseUI.
					const uiConfig = {
						// Popup signin flow rather than redirect flow.
						signInFlow: "popup",
						// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
						signInSuccessUrl: "/signedIn",
						// We will display Google and Facebook as auth providers.
						signInOptions: [
							firebase.auth.GoogleAuthProvider.PROVIDER_ID,
						],
					}
					return (
						<StyledFirebaseAuth
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					)
				}}
			</FirebaseContext.Consumer> */}
			{/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} /> */}
		</Container>
	)
}

export default Page
