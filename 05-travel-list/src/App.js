import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	// karena component Form dan PackingList ini perlu state yang sama
	// sedangkan posisinya mereka siblings atau sejajar bukan parent - child
	// jadi perlu buat state nya di parent component dari Form dan PackingList
	// lalu untuk mengambil data dari Form dihandle oleh function handleAddItems, yang mana akan dipanggil dari Form saat submit untuk di-setItems
	// nah sedangkan array dari items ini dikirim ke PackingList untuk dirender

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList items={items} />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🥳 Far Away 🙂‍↔️</h1>;
}

function Form({ onAddItems }) {
	const [quantity, setQuantity] = useState(1);
	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		// e.preventDefault() untuk mencegah reload page / lainnya
		e.preventDefault();
		if (!description) return;

		const newItem = {
			description: description,
			quantity: quantity,
			packed: false,
			id: Date.now(),
		};

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 🤩 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>😜 You have X items on your list, and you already packed X (X%)</em>
		</footer>
	);
}
