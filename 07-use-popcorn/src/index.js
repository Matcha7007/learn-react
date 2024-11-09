import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRatings from "./StarRatings";
// import "./index.css";
// import App from "./App";

function Test() {
	const [movieRating, setMovieRating] = useState(0);
	return (
		<div>
			<StarRatings color="blue" maxRatings={10} onSetRating={setMovieRating} />
			<p>This movie was rated {movieRating} stars</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<StarRatings
			maxRatings={5}
			messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
		/>
		<StarRatings maxRatings={10} defaultRating={3} />
		<Test />
	</React.StrictMode>
);
