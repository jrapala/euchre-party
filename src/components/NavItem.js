import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

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

const NavItem = ({ text }) => (
	<Item>
		<Text>{text}</Text>
	</Item>
)

NavItem.propTypes = {
	text: PropTypes.string.isRequired,
}
export default NavItem
