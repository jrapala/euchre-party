import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "emotion-theming"
import theme from "./utils/theme"
import Page from "./views/Page"

const App = () => (
	<ThemeProvider theme={theme}>
		<Page />
	</ThemeProvider>
)

render(React.createElement(App), document.getElementById("root"))
