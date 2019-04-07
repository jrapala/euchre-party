import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import GoogleButton from "react-google-button"
import { firebase, googleAuthProvider } from "./Firebase/firebase"

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 5%;
	width: 100%;
`
const Title = styled.p`
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.bold};
	text-transform: uppercase;
`

const Grid = styled.div`
	display: grid;
	font-size: 20px;
	grid-template-columns: auto auto auto;
	margin-top: 2%;
	padding: 10px;
	text-align: center;
	width: 80%;
`

const GridHeader = styled.div`
	background-color: rgba(255, 255, 255, 0.8);
	font-weight: ${props => props.theme.fontWeights.semibold};
	padding: 20px;
`

const GridItem = styled.div`
	background-color: rgba(255, 255, 255, 0.8);
	border-top: 1px solid rgba(0, 0, 0, 0.8);
	padding: 20px;
`
const RSVPButton = styled.button`
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

const Modal = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 200px;
	/* margin-top: 5%; */
	/* width: 100%; */
`

const SignIn = styled.h2`
	margin-bottom: 5%;
`

class RSVP extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	state = {
		visible: false,
		user: null,
	}

	show() {
		this.setState({ visible: true })
	}

	hide() {
		this.setState({ visible: false })
	}

	login() {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(result => {
				this.setState({
					user: result.user,
				})
			})
	}

	render() {
		const { id } = this.props
		const { visible } = this.state
		return (
			<Container id={id}>
				<Title>Guests</Title>
				<Grid>
					<GridHeader>Name</GridHeader>
					<GridHeader>Status</GridHeader>
					<GridHeader>Bringing</GridHeader>
					<GridItem>Juliette</GridItem>
					<GridItem>I&apos;m There!</GridItem>
					<GridItem>Wine</GridItem>
					<GridItem>Paul</GridItem>
					<GridItem>I&apos;m There!</GridItem>
					<GridItem>Pizza</GridItem>
				</Grid>
				<RSVPButton onClick={() => this.show()}>RSVP</RSVPButton>
				<Rodal visible={visible} onClose={() => this.hide()}>
					<Modal>
						<SignIn>Sign In to RSVP</SignIn>
						<GoogleButton
							onClick={() => {
								this.login()
							}}
						/>
					</Modal>
				</Rodal>
			</Container>
		)
	}
}

export default RSVP
