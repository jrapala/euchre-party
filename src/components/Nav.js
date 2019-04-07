import React from "react"
import styled from "@emotion/styled"
import { Link } from "react-scroll"

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
		<Link
			activeClass="active"
			to="when"
			spy
			smooth
			offset={-70}
			duration={500}
		>
			<NavItem text="when" />
		</Link>
		<Link
			activeClass="active"
			to="where"
			spy
			smooth
			offset={-70}
			duration={500}
		>
			<NavItem text="where" />
		</Link>
		<Link
			activeClass="active"
			to="rsvp"
			spy
			smooth
			offset={-70}
			duration={500}
		>
			<NavItem text="RSVP" />
		</Link>
	</Stripe>
)

export default Nav
