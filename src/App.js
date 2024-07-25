import { useState } from 'react';
import Logo from "./assets/images/password_generator.png";
import './App.css';

function App() {
	const [password, setPassword] = useState('hello world');

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
						<button><i className="fa fa-regular fa-copy" /></button>
						<button><i className="fa fa-arrows-rotate" /></button>
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
								<input type="number" min={1} max={64} />
							</div>
							<div>
								<input className="slider" type="range" min={0} max={64} />
							</div>
						</div>
						<div className="d-flex flex-col">
							<div className="d-flex align-items-center justify-content-between">
								<div className="Checkbox-input">
									<input type="checkbox" id="uppercase" />
									<label htmlFor="uppercase">Uppercase</label>
								</div>
								<div className="Checkbox-input">
									<input type="checkbox" id="lowercase" />
									<label htmlFor="lowercase">Lowercase</label>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-between">
								<div className="Checkbox-input">
									<input type="checkbox" id="numbers" />
									<label htmlFor="numbers">Numbers</label>
								</div>
								<div className="Checkbox-input">
									<input type="checkbox" id="symbols" />
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
