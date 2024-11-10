import { useState } from "react";

const content = [
	{
		summary: "React is a library for building UIs",
		details:
			"Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		summary: "State management is like giving state a home",
		details:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		summary: "We can think of props as the component API",
		details:
			"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
	},
];

export default function App() {
	return (
		<div>
			<Tabbed content={content} />
		</div>
	);
}

function Tabbed({ content }) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className="tabs">
				<Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
				<Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
				<Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
				<Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
			</div>

			{activeTab <= 2 ? (
				<TabContent
					item={content.at(activeTab)}
					key={content.at(activeTab).summary}
				/>
			) : (
				<DifferentContent />
			)}
		</div>
	);
}

function Tab({ num, activeTab, onClick }) {
	return (
		<button
			className={activeTab === num ? "tab active" : "tab"}
			onClick={() => onClick(num)}>
			Tab {num + 1}
		</button>
	);
}

function TabContent({ item }) {
	const [showDetails, setShowDetails] = useState(true);
	const [likes, setLikes] = useState(0);

	function handleInc() {
		// update state seperti ini / tidak menggunakan callback function di dalamnya
		// normal - normal saja, tetapi lebih bagusnya memakai callback function
		// seperti di handleTripleInc()
		setLikes(likes + 1);
	}

	function handleTripelInc() {
		// kalo menggunakan callback function seperti ini, value likes akan diambil paling terbaru meski sudah diupdate di atas sekali
		// jadi kalo dipanggil 3x gini jadi
		// likes = 0, likes = likes + 1 = 1
		setLikes((likes) => likes + 1);
		// likes = 1, likes = likes + 1 = 2
		setLikes((likes) => likes + 1);
		// likes = 2, likes = likes + 1 = 3
		setLikes((likes) => likes + 1);

		// berbeda kalo langsung seperti ini meski 3x dipanggil react menganggap perubahannya sama
		// si setLikes pake value likes yang terakhir aja ga berkala manggil terbaru
		// likes = 0, likes + 1 = 1
		// setLikes(likes + 1);
		// likes = 0, likes + 1 = 1
		// setLikes(likes + 1);
		// likes = 0, likes + 1 = 1
		// setLikes(likes + 1);
	}

	function handleUndo() {
		setShowDetails(true);
		setLikes(0);
	}

	function handleUndoAfterWait() {
		// set timeout seperti ini pada react 18 bisa digunakan langsung
		// kalo di react 18 ke bawah mesti di dalam useEffect
		setTimeout(handleUndo, 2000);
	}

	return (
		<div className="tab-content">
			<h4>{item.summary}</h4>
			{showDetails && <p>{item.details}</p>}

			<div className="tab-actions">
				<button onClick={() => setShowDetails((h) => !h)}>
					{showDetails ? "Hide" : "Show"} details
				</button>

				<div className="hearts-counter">
					<span>{likes} ❤️</span>
					<button onClick={handleInc}>+</button>
					<button onClick={handleTripelInc}>+++</button>
				</div>
			</div>

			<div className="tab-undo">
				<button onClick={handleUndo}>Undo</button>
				<button onClick={handleUndoAfterWait}>Undo in 2s</button>
			</div>
		</div>
	);
}

function DifferentContent() {
	return (
		<div className="tab-content">
			<h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
		</div>
	);
}
