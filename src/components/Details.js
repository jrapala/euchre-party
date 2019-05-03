import React, { Fragment } from "react"

const Details = () => (
	<Fragment>
		<p>Games start at 6pm SHARP!!!</p>
		<br />
		<p>
			Please click{" "}
			<a
				href="https://cardgames.io/euchre/"
				target="_blank"
				rel="noopener noreferrer"
			>
				here
			</a>{" "}
			for rules.
		</p>
		<br />
		<p>
			{`For this tournament, each player will come as an individual and keep
			track of their own score. The night will start with people being
			randomly assigned to tables. After each round, the winners remain at
			the table and switch partners, while the losers move to the next
			table. You earn points based on how many points you scored in each
			round. So if Team A beat Team B 11 / 6, each player on Team A would
			record 11 points, and each player on Team B would record 6 points.`}
		</p>
		<br />
		<p>
			{`We'll plan on playing 5-8 rounds, depending on how quickly the games
			move. We're also going to keep the rules simple, so no bottoms,
			stick the dealer, defending alone. There will be some new players
			joining so we'll keep the keep the games fun and relaxed!`}
		</p>
	</Fragment>
)

export default Details
