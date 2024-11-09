import React from "react";
import ReactDOM from "react-dom/client";
import StarRatings from "./StarRatings";
// import "./index.css";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<StarRatings maxRatings={5} />
		<StarRatings maxRatings={10} />
	</React.StrictMode>
);
