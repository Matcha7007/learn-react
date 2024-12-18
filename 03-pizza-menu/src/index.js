import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

// component react ini terdiri dari data - logic - ui/html
// contohnya ini ->
// dalam penulisan nama function jsx ini mesti diawali dengan huruf kapital
// semua yang ada di dalam function ini data + logic + ui akan dirender dari jsx -> html
// function App() {
// di dalam function ini kita bisa menambahkan syntax javascript
// 	return (
// nah di return ini adalah html
// kita juga bisa menggunakan js mode dengan memanggil kurawal {}
// jadi di dalam {} kita bisa menggunakan syntax js
// seperti assign variable, logic, function array dll
// 		<div className="container">
// 			<Header />
// 			<Menu />
// 			<Footer />
// 		</div>
// 	);
// }

function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	// const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
	const style = {};
	return (
		<header className="header">
			<h1 style={style}>Fast React Piza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{/* render elemen dengan kondisi sort circuit dengan operator logical && */}
			{/* ini akan merender elemen di sebelah kanan && jika di kiri bernilai true */}
			{/* {numPizzas > 0 && (
				<ul className="pizzas">
					{pizzas.map((pizza) => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			)} */}

			{/* render elemen dengan kondisi ternary operator */}
			{/* ini render seperti if else jadi kalo true akan render elemen A dan jika false akan render elemen B */}
			{numPizzas > 0 ? (
				// add react fragment <></> atau <React.Fragment></React.Fragment>
				// untuk mereturn lebih dari satu element tanpa dibungkus elemen lain
				<>
					<p>
						Authentic Italian cuisine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>
					<ul className="pizzas">
						{pizzas.map((pizza) => (
							<Pizza pizzaObj={pizza} key={pizza.name} />
						))}
					</ul>
				</>
			) : (
				<p>We're still working on our menu. Please come back later :)</p>
			)}
		</main>
	);
}

function Pizza({ pizzaObj }) {
	// if (pizzaObj.soldOut) return null;
	// memberikan className sesuai dengan kondisi
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt={pizzaObj.name} />
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
			</div>
		</li>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 10;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	return (
		<footer className="footer">
			{isOpen ? (
				// extract to another component untuk memudahkan maintain pada skala besar atau code terlalu panjang
				<Order closeHour={closeHour} openHour={openHour} />
			) : (
				<p>
					We're happy to welcome you between {openHour}:00 to {closeHour}:00
				</p>
			)}
		</footer>
	);
}

function Order({ closeHour, openHour }) {
	return (
		<div className="order">
			<p>
				We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
				online.
			</p>
			<button className="btn">Order</button>
		</div>
	);
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
