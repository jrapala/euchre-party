import React, { Fragment } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import GoogleButton from "react-google-button"
import "react-widgets/dist/css/react-widgets.css"
import { Combobox } from "react-widgets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTimes, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { firebase, googleAuthProvider, database } from "./Firebase/firebase"

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

const RSVPButtonSmall = styled.button`
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
	transition: all 0.25s ease;
	&:hover {
		border: 1px solid ${props => props.hoverColor};
		color: ${props => props.hoverColor};
	}
`

const SignIn = styled.h2`
	margin-bottom: 10%;
`

const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 18px;
`

const SubmitButton = styled.button`
	border: 2px solid ${props => props.theme.colors.blue};
	border-radius: 5px;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
	color: ${props => props.theme.colors.blue};
	cursor: pointer;
	font-size: 14px;
	font-weight: ${props => props.theme.fontWeights.bold};
	margin: 10px;
	padding: 8px;
	width: 100px;
	transition: all 0.25s ease;
	&:hover {
		color: ${props => props.theme.colors.white};
		background-color: ${props => props.theme.colors.blue};
	}
	margin-top: 20px;
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

const items = [
	"Pinot Noir",
	"Interesting Beer",
	"Doritos",
	"Tortilla Chips",
	"Guacamole",
]

class RSVP extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
	}

	state = {
		attendees: [],
		displayName: "",
		existingUser: false,
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
		database
			.ref("attendees")
			.once("value")
			.then(snapshot => {
				// console.log(snapshot)
				const attendees = []
				snapshot.forEach(childSnapshot => {
					attendees.push({
						id: childSnapshot.key,
						...childSnapshot.val(),
					})
				})
				this.setState({ attendees })
			})
	}

	handleComboBox = value => {
		this.setState({ itemBringing: value })
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

		let item = itemBringing
		if (rsvpSelection === "no" || rsvpSelection === "maybe") {
			item = ""
		}
		database.ref(`attendees/${uid}`).set({
			email: user,
			name: displayName,
			going: rsvpSelection,
			bringing: item,
		})
		this.getAttendees()
	}

	hide() {
		this.setState({ visible: false })
	}

	login() {
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
			})
	}

	select(selection) {
		this.setState({ rsvpSelection: selection })
	}

	show() {
		this.setState({ visible: true })
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
			rsvpSelection,
			user,
			visible,
		} = this.state

		return (
			<Container id={id}>
				{attendees.length ? (
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
				)}
				<RSVPButton large onClick={() => this.show()}>
					{user ? "Modify" : "RSVP"}
				</RSVPButton>
				<Rodal
					visible={visible}
					onClose={() => this.hide()}
					height={300}
				>
					<Modal>
						{!user ? (
							<React.Fragment>
								<SignIn>Sign In to RSVP</SignIn>
								<GoogleButton
									onClick={() => {
										this.login()
									}}
								/>
							</React.Fragment>
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
									<RSVPButtonSmall
										hoverColor="#23aa23"
										color={
											rsvpSelection === "yes"
												? "#23aa23"
												: "#b4b3be"
										}
										onClick={() => this.select("yes")}
									>
										<StyledIcon icon={faCheck} />
										<div>Yes</div>
									</RSVPButtonSmall>
									<RSVPButtonSmall
										hoverColor="#d8151f"
										color={
											rsvpSelection === "no"
												? "#d8151f"
												: "#b4b3be"
										}
										onClick={() => this.select("no")}
									>
										<StyledIcon icon={faTimes} />
										<div>No</div>
									</RSVPButtonSmall>
									<RSVPButtonSmall
										hoverColor="#eded1a"
										color={
											rsvpSelection === "maybe"
												? "#eded1a"
												: "#b4b3be"
										}
										onClick={() => this.select("maybe")}
									>
										<StyledIcon icon={faQuestion} />
										<div>Maybe</div>
									</RSVPButtonSmall>
								</ButtonGroup>

								{rsvpSelection === "yes" ? (
									<Fragment>
										<Question>
											<Text>I am bringing:</Text>
										</Question>
										<Combobox
											data={items.sort()}
											defaultValue={itemBringing}
											placeholder="A tasty beverage.."
											onChange={this.handleComboBox}
										/>
									</Fragment>
								) : (
									<Fragment />
								)}
								{itemBringing.length ||
								rsvpSelection === "no" ||
								rsvpSelection === "maybe" ? (
									<SubmitButton onClick={() => this.submit()}>
										Submit
									</SubmitButton>
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
