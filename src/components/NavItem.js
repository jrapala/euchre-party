import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { Link } from "react-scroll"

const Item = styled.div`
	display: flex;
	cursor: pointer;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	padding: 0 20px;
`

const Text = styled.p`
	color: ${props => props.theme.colors.white};
`

const NavItem = ({ to }) => (
	<Link activeClass="active" to={to} spy smooth offset={-70} duration={500}>
		<Item>
			<Text>{to}</Text>
		</Item>
	</Link>
)

NavItem.propTypes = {
	to: PropTypes.string.isRequired,
}
export default NavItem
