import { useState } from "react";

const messages = [
	"Learn React ⚛️",
	"Apply for jobs 💼",
	"Invest your new income 🤑",
];

export default function App() {
	// tiap component memanage statenya sendiri sendiri
	// meski dipanggil beberapa kali seperti component <Step />
	return (
		<div>
			<Step />
			{/* <Step /> */}
		</div>
	);
}

function Step() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	// useState ini akan memicu rerendering pada component kalo
	// value state diubah
	// misal yang isOpen sebagai variable dari statenya dan setIsOpen
	// sebagai function callback untuk meng-set value dari variable statenya
	// contoh setIsOpen(true/false) berarti ini akan mengubah isOpen menjadi value yang tadi diset
	// sebenernya setIsOpen() ini ada callback function
	// jadi setIsOpen(callback) -> setIsOpen((currentStateValue) => !currentStateValue)

	function handleNext() {
		if (step < messages.length) setStep((s) => s + 1);
	}

	function handlePrevious() {
		if (step > 1) setStep((s) => s - 1);
	}

	return (
		<div>
			<button className="close" onClick={() => setIsOpen((is) => !is)}>
				&times;
			</button>
			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<div className={step >= 1 ? "active" : ""}>1</div>
						<div className={step >= 2 ? "active" : ""}>2</div>
						<div className={step >= 3 ? "active" : ""}>3</div>
					</div>
					<StepMessage step={step}>
						{messages[step - 1]}
						<div className="buttons">
							<Button
								bgColor="#e7e7e7"
								textColor="#333"
								onClick={() => alert(`Learn how to ${messages[step - 1]}`)}>
								Learn How
							</Button>
						</div>
					</StepMessage>
					<div className="buttons">
						<Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
							Previous
						</Button>
						<Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
							Next
						</Button>
					</div>
				</div>
			)}
		</div>
	);

	function StepMessage({ step, children }) {
		return (
			<div className="message">
				<h3>Step {step}</h3>
				{children}
			</div>
		);
	}

	function Button({ textColor, bgColor, onClick, children }) {
		return (
			<button
				style={{ backgroundColor: bgColor, color: textColor }}
				onClick={onClick}>
				{children}
			</button>
		);
	}
}
