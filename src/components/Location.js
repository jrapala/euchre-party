import React, { Fragment } from "react"

const Location = () => {
	const link = process.env.GOOGLE_MAPS_LINK
	return (
		<Fragment>
			<p>Paul and Juliette&apos;s</p>
			<a href={link} target="_blank" rel="noopener noreferrer">
				{process.env.ADDRESS_LINE_ONE}
			</a>
			<a href={link} target="_blank" rel="noopener noreferrer">
				{process.env.ADDRESS_LINE_TWO}
			</a>
		</Fragment>
	)
}

export default Location
