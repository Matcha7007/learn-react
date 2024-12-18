import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showFormAddFriend, setShowFormAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleShow() {
		setShowFormAddFriend((show) => !show);
		setSelectedFriend(null);
	}

	function handleAddFriend(friend) {
		setFriends((curFriend) => [...curFriend, friend]);
		setShowFormAddFriend(false);
	}

	function handleSelection(friend) {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowFormAddFriend(false);
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);

		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelection}
					selectedFriend={selectedFriend}
				/>
				{showFormAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleShow}>
					{showFormAddFriend ? "close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill onSplitbill={handleSplitBill} friend={selectedFriend} />
			)}
		</div>
	);
}

function FriendsList({ friends, onSelection, selectedFriend }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					selectedFriend={selectedFriend}
					onSelection={onSelection}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onSelection, selectedFriend }) {
	const selected = selectedFriend?.id === friend.id;
	return (
		<li className={selected ? "selected" : ""}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>

			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} IDR{Math.abs(friend.balance)}
				</p>
			)}

			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you IDR{Math.abs(friend.balance)}
				</p>
			)}

			{friend.balance === 0 && <p>You and {friend.name} are even</p>}

			<Button onClick={() => onSelection(friend)}>
				{selected ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !image) return;

		const id = crypto.randomUUID();

		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		};
		onAddFriend(newFriend);
		setName("");
		setImage("https://i.pravatar.cc/48");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>G Friend Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>G Image Url</label>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ friend, onSplitbill }) {
	const [bill, setBill] = useState("");
	const [paidByUser, setPaidByUser] = useState("");
	const paidByFriend = bill ? bill - paidByUser : "";
	const [isPaying, setIsPaying] = useState("user");

	function handleSubmit(e) {
		e.preventDefault();
		if (!bill || !paidByUser) return;
		onSplitbill(isPaying === "user" ? paidByFriend : -paidByUser);
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {friend.name}</h2>
			<label>G Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>G Your expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser(
						Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
					)
				}
			/>

			<label>G {friend.name}'s expense</label>
			<input type="text" disabled value={paidByFriend} />

			<label>G Who is the paying?</label>
			<select value={isPaying} onChange={(e) => setIsPaying(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{friend.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
}
