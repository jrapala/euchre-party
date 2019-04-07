import React from "react"
import styled from "@emotion/styled"

import logo from "../../public/assets/img/euchreParty.png"

const Image = styled.img`
	margin-bottom: 5%;
	margin-top: 5%;
	min-width: 300px;
	width: 30%;
`
const Header = () => <Image src={logo} />

export default Header
