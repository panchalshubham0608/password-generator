import { useCallback, useEffect, useState } from 'react';
import Logo from "./assets/images/password_generator.png";
import './App.css';
import { generatePassword, copyPasswordToClipboard } from "./utils";

function App() {
	const [password, setPassword] = useState('hello world');
	const [upperCase, setUpperCase] = useState(true);
	const [lowerCase, setLowerCase] = useState(true);
	const [numbers, setNumbers] = useState(true);
	const [symbols, setSymbols] = useState(true);
	const [length, setLength] = useState(12);
	const [copyIconClassName, setCopyIconClassName] = useState("fa-regular fa-copy");

	// A utility function to generate password
	const generateAndShowPassword = useCallback(() => {
		try {
			// generate password based on current configuration
			let password = generatePassword({upperCase, lowerCase, numbers, symbols, length});
			setPassword(password);	
		} catch (error) { /* ignore */ }
	}, [upperCase, lowerCase, numbers, symbols, length]);

	// A new password should be generated when things changes
	useEffect(generateAndShowPassword, [generateAndShowPassword]);

	// Utility function to check if none of the checkboxes is checked
	const isNoneChecked = useCallback(() => !lowerCase && !upperCase && !numbers && !symbols, [upperCase, lowerCase, numbers, symbols]);

	// If none of the checkboxes is checked, we default to uppercase
	useEffect(() => {
		if (isNoneChecked()) {
			setUpperCase(true);
		}
	}, [isNoneChecked]);

	const handleCopyPassword = () => {
		copyPasswordToClipboard(password);
		setCopyIconClassName("fa-solid fa-check");
		setTimeout(() => setCopyIconClassName("fa-regular fa-copy"), 1000);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="d-flex align-items-center justify-content-center"><img src={Logo} alt="logo" width={50} />PassGuard</h1>
				<h2>Secure Your Digital World: Generate Strong, Random Passwords Instantly!</h2>
				<p>Protect your online accounts with our easy-to-use password generator. Create strong, unique passwords with just a click!</p>
			</header>
			<main>
				<div className="Password-container">
					<p>{password}</p>
					<div>
						<button onClick={handleCopyPassword}><i className={copyIconClassName} /></button>
						<button onClick={generateAndShowPassword}><i className="fa fa-arrows-rotate" /></button>
					</div>
				</div>
				<div className="Customize-container">
					<div>
						<h2>Customize your password</h2>
					</div>
					<div className="Customize-input-container">
						<div>
							<div className="Number-input d-flex flex-col">
								<label htmlFor="password-length">Password Length</label>
								<input type="number" min={1} max={64}
									value={length} onChange={e => {
										let value = Math.min(64, e.target.value);
										setLength(value);
									}} />
							</div>
							<div>
								<input className="slider" type="range" min={0} max={64}
									value={length} onChange={e => setLength(e.target.value)} />
							</div>
						</div>
						<div className="d-flex flex-col">
							<div className="d-flex align-items-center justify-content-between">
								<div className="Checkbox-input">
									<input type="checkbox" id="uppercase"
										checked={upperCase} onChange={e => setUpperCase(e.target.checked) } />
									<label htmlFor="uppercase">Uppercase</label>
								</div>
								<div className="Checkbox-input">
									<input type="checkbox" id="lowercase"
										checked={lowerCase} onChange={e => setLowerCase(e.target.checked)}/>
									<label htmlFor="lowercase">Lowercase</label>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-between">
								<div className="Checkbox-input">
									<input type="checkbox" id="numbers"
										checked={numbers} onChange={e => setNumbers(e.target.checked)}/>
									<label htmlFor="numbers">Numbers</label>
								</div>
								<div className="Checkbox-input">
									<input type="checkbox" id="symbols"
										checked={symbols} onChange={e => setSymbols(e.target.checked)}/>
									<label htmlFor="symbols">Symbols</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
