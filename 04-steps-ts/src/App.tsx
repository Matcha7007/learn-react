import { ReactNode, useState } from "react";

const messages = [
	"Learn React ⚛️",
	"Apply for jobs 💼",
	"Invest your new income 🤑",
];

export default function App() {
	return (
		<div>
			{/* <Step /> */}
			<Step />
		</div>
	);
}

function Step() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

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
						<Button onClick={handlePrevious}>Previous</Button>
						<Button onClick={handleNext}>Next</Button>
					</div>
				</div>
			)}
		</div>
	);
}

interface StepMessageProps {
	step?: number;
	children?: ReactNode;
}

function StepMessage({ step, children }: StepMessageProps) {
	return (
		<div className="message">
			<h3>Step {step ? step : 0}</h3>
			{children ? children : "Type some message"}
		</div>
	);
}

interface ButtonProps {
	bgColor?: string;
	textColor?: string;
	onClick?: () => void;
	children?: ReactNode;
}

function Button({ bgColor, textColor, onClick, children }: ButtonProps) {
	return (
		<button
			style={{
				backgroundColor: bgColor ? bgColor : "#7950f2",
				color: textColor ? textColor : "#fff",
			}}
			onClick={onClick}>
			{children ? children : "Button"}
		</button>
	);
}
