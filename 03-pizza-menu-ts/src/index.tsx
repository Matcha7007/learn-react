import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface PizzaProps {
	name: string;
	ingredients: string;
	price: number;
	photoName: string;
	soldOut: boolean;
}

const pizzaData: PizzaProps[] = [
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
	return (
		<header className="header">
			<h1>Fast React Piza Co.</h1>
		</header>
	);
}

function Menu() {
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;

	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{numPizzas > 0 ? (
				<>
					<p>
						Authentic Italian cuisine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>
					<ul className="pizzas">
						{pizzas.map((pizza: PizzaProps) => (
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

interface PizzaObjProps {
	pizzaObj: PizzaProps;
}

function Pizza({ pizzaObj }: PizzaObjProps) {
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt={pizzaObj.name} />
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.soldOut ? "SOLD OUT" : `USD.${pizzaObj.price}`}</span>
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

interface OrderProps {
	openHour: number;
	closeHour: number;
}

function Order({ closeHour, openHour }: OrderProps) {
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

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
