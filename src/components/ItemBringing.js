import React, { Fragment } from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import "react-widgets/dist/css/react-widgets.css"
import { Combobox } from "react-widgets"

import * as CONST from "../libs/constants"

const propTypes = {
	itemBringing: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
}

const defaultProps = {
	itemBringing: "",
}

const Question = styled.div`
	width: 100%;
	margin-left: 5px;
`

const Text = styled.p`
	margin-bottom: 10px;
	margin-top: 10px;
	font-size: 20px;
	margin-left: 5px;
`
const ItemBringing = ({ itemBringing, onChange, onKeyDown }) => (
	<Fragment>
		<Question>
			<Text>I am bringing:</Text>
		</Question>
		<Combobox
			data={CONST.items.sort()}
			defaultValue={itemBringing}
			placeholder="Enter or choose an item"
			onChange={onChange}
			onKeyDown={onKeyDown}
			suggest
		/>
	</Fragment>
)

ItemBringing.propTypes = propTypes
ItemBringing.defaultProps = defaultProps

export default ItemBringing
