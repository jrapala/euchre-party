import React from "react"
import styled from "@emotion/styled"

import NavItem from "./NavItem"

const Stripe = styled.div`
	background-color: ${props => props.theme.colors.black};
	display: flex;
	flex-direction: row;
	font-size: 20px;
	font-weight: ${props => props.theme.fontWeights.regular};
	height: 60px;
	justify-content: space-evenly;
	text-transform: uppercase;
	width: 100%;
`
const Nav = () => (
	<Stripe>
		<NavItem to="when" />
		<NavItem to="where" />
		<NavItem to="rsvp" />
	</Stripe>
)

export default Nav
