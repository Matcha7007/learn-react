import React from "react";
import ReactDOM from "react-dom/client";

function App() {
	return <h1>Hello React</h1>;
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
