import React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "emotion-theming"
import theme from "./utils/theme"
import Page from "./views/Page"
// import Firebase, { FirebaseContext } from "./components/Firebase"

const App = () => (
	<ThemeProvider theme={theme}>
		{/* <FirebaseContext.Provider value={new Firebase()}> */}
		<Page />
		{/* </FirebaseContext.Provider> */}
	</ThemeProvider>
)

render(React.createElement(App), document.getElementById("root"))
