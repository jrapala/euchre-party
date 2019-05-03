import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { keyframes } from "@emotion/core"
import styled from "@emotion/styled"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import GoogleButton from "react-google-button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

import { firebase, googleAuthProvider, database } from "../utils/firebase"
import ButtonTransparent from "./ButtonTransparent"
import ButtonWithIcon from "./ButtonWithIcon"
import ItemBringing from "./ItemBringing"

const ButtonGroup = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
`

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 5%;
	width: 100%;
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
	text-transform: capitalize;
`

const Modal = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 280px;
`

const Question = styled.div`
	width: 100%;
	margin-left: 5px;
`

const SignIn = styled.h2`
	margin-bottom: 10%;
`

const spin = keyframes`
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
`

const ModalSpinnerIcon = styled(FontAwesomeIcon)`
	animation ${spin} 1s linear infinite;
	color: ${props => props.theme.colors.blue};
	font-size: 40px;
`

const SpinnerIcon = styled(FontAwesomeIcon)`
	animation ${spin} 1s linear infinite;
	color: ${props => props.theme.colors.blue};
	font-size: 40px;
	margin-bottom: 100px;
`

const Text = styled.p`
	margin-bottom: 10px;
	margin-top: 10px;
	font-size: 20px;
	margin-left: 5px;
`

const Title = styled.p`
	font-size: 24px;
	font-weight: ${props => props.theme.fontWeights.bold};
	text-transform: uppercase;
`

class RSVP extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props)
		this.submitButton = React.createRef()
	}

	state = {
		attendees: [],
		displayName: "",
		existingUser: false,
		modalLoading: false,
		loading: false,
		user: "",
		visible: false,
		rsvpSelection: "",
		itemBringing: "",
		uid: "",
	}

	componentDidMount() {
		this.getAttendees()
	}

	getAttendees = () => {
		this.setState({ loading: true })
		database
			.ref("attendees")
			.once("value")
			.then(snapshot => {
				const attendees = []
				snapshot.forEach(childSnapshot => {
					attendees.push({
						id: childSnapshot.key,
						...childSnapshot.val(),
					})
				})
				this.setState({ attendees })
			})
			.then(() => {
				this.setState({ loading: false })
			})
			.catch(err => console.log(err.message)) // eslint-disable-line no-console
	}

	handleComboBox = value => {
		this.setState({ itemBringing: value })
	}

	handleKeyDown = e => {
		if (e.key === "Enter") {
			e.preventDefault()
			this.setState({ itemBringing: e.target.value })
			this.submitButton.current.focus()
		}
	}

	submit() {
		const {
			displayName,
			itemBringing,
			rsvpSelection,
			uid,
			user,
		} = this.state
		this.hide()

		database.ref(`attendees/${uid}`).set({
			email: user,
			name: displayName,
			going: rsvpSelection,
			bringing: itemBringing,
		})
		this.getAttendees()
	}

	hide() {
		this.setState({ visible: false })
	}

	login() {
		this.setState({ modalLoading: true })
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(result => {
				const name =
					result.additionalUserInfo.profile.given_name ||
					result.user.displayName
				const userId = result.user.uid
				this.setState({
					displayName: name,
					uid: userId,
					user: result.user.email,
				})

				// Check if user exists
				database
					.ref("attendees")
					.child(userId)
					.once("value")
					.then(snapshot => {
						if (snapshot.val() !== null) {
							this.setState({
								existingUser: true,
								itemBringing: snapshot.val().bringing,
								rsvpSelection: snapshot.val().going,
							})
						}
					})
					.then(() => this.setState({ modalLoading: false }))
					.catch(err => console.log(err.message)) // eslint-disable-line no-console
			})
			.catch(err => console.log(err.message)) // eslint-disable-line no-console
	}

	select(selection) {
		this.setState({ rsvpSelection: selection })
		if (selection === "no" || selection === "maybe") {
			this.setState({ itemBringing: "" })
		}
	}

	show() {
		this.setState({ visible: true })
	}

	renderGuestList = () => {
		const { attendees } = this.state
		let content
		if (attendees.length) {
			content = (
				<Fragment>
					<Title>Guests</Title>
					<Grid>
						<GridHeader>Name</GridHeader>
						<GridHeader>Status</GridHeader>
						<GridHeader>Bringing</GridHeader>
						{this.renderRows()}
					</Grid>
				</Fragment>
			)
		}
		return content
	}

	renderRows = () => {
		const { attendees } = this.state
		const content = []
		attendees.forEach(attendee => {
			const { bringing, id, going, name } = attendee
			let status = "Can't Come"
			if (going === "yes") {
				status = "I'm There!"
			} else if (going === "maybe") {
				status = "Might be there"
			}
			content.push(
				<Fragment key={id.substring(0, 5)}>
					<GridItem>{name}</GridItem>
					<GridItem>{status}</GridItem>
					<GridItem>{bringing}</GridItem>
				</Fragment>
			)
		})
		return content
	}

	render() {
		const { id } = this.props
		const {
			attendees,
			displayName,
			existingUser,
			itemBringing,
			loading,
			modalLoading,
			rsvpSelection,
			user,
			visible,
		} = this.state

		return (
			<Container id={id}>
				{loading ? <SpinnerIcon icon={faSpinner} /> : <Fragment />}
				{this.renderGuestList()}
				{/* {attendees.length ? (
					<Fragment>
						<Title>Guests</Title>
						<Grid>
							<GridHeader>Name</GridHeader>
							<GridHeader>Status</GridHeader>
							<GridHeader>Bringing</GridHeader>
							{this.renderRows()}
						</Grid>
					</Fragment>
				) : (
					<Fragment />
				)} */}
				<ButtonTransparent
					large
					onClick={() => this.show()}
					text={user ? "Modify" : "RSVP"}
				/>
				<Rodal
					visible={visible}
					onClose={() => this.hide()}
					height={300}
				>
					<Modal>
						{user ? (
							<React.Fragment>
								<SignIn>Sign In to RSVP</SignIn>
								<GoogleButton
									onClick={() => {
										this.login()
									}}
								/>
							</React.Fragment>
						) : modalLoading ? (
							<ModalSpinnerIcon icon={faSpinner} />
						) : (
							<React.Fragment>
								{existingUser ? (
									<Text>
										Welcome back
										{displayName ? ` ${displayName}!` : "!"}
									</Text>
								) : (
									<Text>Hey {displayName || "you"}!</Text>
								)}
								<Question>
									<Text>Are you in?</Text>
								</Question>
								<ButtonGroup>
									<ButtonWithIcon
										type="yes"
										rsvpSelection={rsvpSelection}
										onClick={() => this.select("yes")}
									/>
									<ButtonWithIcon
										type="no"
										rsvpSelection={rsvpSelection}
										onClick={() => this.select("no")}
									/>
									<ButtonWithIcon
										type="maybe"
										rsvpSelection={rsvpSelection}
										onClick={() => this.select("maybe")}
									/>
								</ButtonGroup>
								{rsvpSelection === "yes" ? (
									<ItemBringing
										itemBringing={itemBringing}
										onChange={this.handleComboBox}
										onKeyDown={this.handleKeyDown}
									/>
								) : (
									<Fragment />
								)}
								{itemBringing.length ||
								rsvpSelection === "no" ||
								rsvpSelection === "maybe" ? (
									<ButtonTransparent
										margin="20px 10px"
										onClick={() => this.submit()}
										ref={this.submitButton}
										text="Submit"
									/>
								) : (
									<Fragment />
								)}
							</React.Fragment>
						)}
					</Modal>
				</Rodal>
			</Container>
		)
	}
}

export default RSVP
