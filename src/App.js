import React, { useState, useEffect } from 'react';
import './App.css';
import './assets/css/style.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';

import happyface from './assets/images/happy-face.png';
import blush from './assets/images/blush-face.png';
import getting_crazy from './assets/images/getting-crazy-face.png';
import crazy from './assets/images/oh-no-face.png';

function App() {
	const [change, setChange] = useState(0)
	const [danger, setDanger] = useState(0)
	const [success, setSuccess] = useState(0)
	const [standardDrinks, setStandardDrinks] = useState(0)
	const checkData = key => {
    	const data = localStorage.getItem(key);
    	if (!data) {
			console.log('Setting default')
			localStorage.setItem('age', 0);
			localStorage.setItem('drinks', 0);
			localStorage.setItem('driving', 'No');
			localStorage.setItem('gender', 'Male');
			localStorage.setItem('weight', 60);
			localStorage.setItem('current-danger', 0);
			localStorage.setItem('current-warning', 0);
			localStorage.setItem('current-success', 0);
		}
	}
	
	function checkWarning(current_danger, current_warning) {
		console.log("Checking End")
		if (current_danger + current_warning > 100) {
			alert("Please Consider Not Drinking Anymore or Sharing Larger Bottles.")
		}
	}

	useEffect(() => {
		let current_danger = localStorage.getItem('current-danger');
		let current_warning = localStorage.getItem('current-warning');
		let current_success = localStorage.getItem('current-success');
		let drinks = localStorage.getItem('drinks');
		console.log(current_warning);
		checkData('current-danger');
		setChange(current_warning);	
		setDanger(current_danger);
		localStorage.setItem('current-success', current_success - change);
		let sum = current_warning + current_danger;
		// setSuccess(drinks - current_warning - current_danger)
		checkWarning(current_danger, current_warning);
		getFace(current_danger, current_warning);
	}, [])

	function changeAge(event) {
		localStorage.setItem('age', event.target.value);
	}
	function changeWeight(event) {
		localStorage.setItem('weight', event.target.value);
	}
	function changeGender(event) {
		localStorage.setItem('gender', event.target.value);
	}
	function changeDriving(event) {
		localStorage.setItem('driving', event.target.value);
	}
	function changeChange(event) {
		localStorage.setItem('current-warning', event.target.value);
	}
	function confirmDanger() {
		let current_warning = localStorage.getItem('current-warning');
		localStorage.setItem('current-danger', current_warning);
	}

	function checkStandardDrinks() {
		let age = localStorage.getItem('age');
		let weight = localStorage.getItem('weight');
		let gender = localStorage.getItem('gender');
		let driving = localStorage.getItem('driving');

		if (age < 18) {
			setStandardDrinks(0)
			localStorage.setItem('drinks', 0);
			localStorage.setItem('current-danger', 100);
			localStorage.setItem('current-change', 0);
			localStorage.setItem('current-success', 0);
		}
		else {
			if ((gender === 'Male' || 'Other')&& driving === 'Yes') {
				localStorage.setItem('drinks', 2);
				localStorage.setItem('current-danger', 50);
				localStorage.setItem('current-change', 0);
				localStorage.setItem('current-success', 50);
				setStandardDrinks(2)
			}
			else if ((gender === 'Male' || 'Other') && driving === 'No') {
				localStorage.setItem('drinks', 4);
				localStorage.setItem('current-danger', 0);
				localStorage.setItem('current-change', 0);
				localStorage.setItem('current-success', 100);
				setStandardDrinks(4)
			}
			else if (gender === 'Female' && driving === 'Yes') {
				localStorage.setItem('drinks', 2);
				localStorage.setItem('current-danger', 0);
				localStorage.setItem('current-change', 0);
				localStorage.setItem('current-success', 50);
				setStandardDrinks(2)
			}
			else if (gender === 'Female' && driving === 'No') {
				localStorage.setItem('drinks', 4);
				localStorage.setItem('current-danger', 0);
				localStorage.setItem('current-change', 0);
				localStorage.setItem('current-success', 100);
				setStandardDrinks(4)
			}
		}
	}
	// Sorry... Look away if you could please kindly...
	// Not enough time to fix and order and sort into files
	let click = document.getElementById('addDanger');
	if (click) {
		click.addEventListener('click', () => {
			let current_warning = localStorage.getItem('current-warning');
			let current_danger = localStorage.getItem('current-danger');
			let current_success = localStorage.getItem('current-sucess');
			let new_sum = JSON.parse(current_warning) + JSON.parse(current_danger);
			localStorage.setItem('current-success', JSON.parse(current_success) - JSON.parse(current_warning));
			localStorage.setItem('current-danger', new_sum);
			localStorage.setItem('current-warning', 0);
		});
	};
	let reset_display = document.getElementById('reset-display');
	if (reset_display) {
		reset_display.addEventListener('click', () => {
			let current_warning = localStorage.getItem('current-warning');
			let current_danger = localStorage.getItem('current-danger');
			let current_sucess = localStorage.getItem('current_sucess');
			let drinks = localStorage.getItem('drinks');
			if (drinks == 0) {
				localStorage.setItem('current-warning', 0);
				localStorage.setItem('current-danger', 100);
				localStorage.setItem('current-success', 0);
			}
			if (drinks == 2) {
				localStorage.setItem('current-warning', 0);
				localStorage.setItem('current-danger', 50);
				localStorage.setItem('current-success', 50);
			}
			if (drinks == 4) {
				localStorage.setItem('current-warning', 0);
				localStorage.setItem('current-danger', 0);
				localStorage.setItem('current-success', 100);
			}
			checkStandardDrinks()
			window.location = "";
		});
	};
	
	let refresh1 = document.getElementById('refresh1');
	if (refresh1) {
		refresh1.addEventListener('click', () => {
			window.location = "";
		});
	};
	let refresh2 = document.getElementById('refresh2');
	if (refresh2) {
		refresh2.addEventListener('click', () => {
			window.location = "";
		});
	};
	let refresh3 = document.getElementById('refresh3');
	if (refresh3) {
		refresh3.addEventListener('click', () => {
			window.location = "";
		});
	};

	let refresh4 = document.getElementById('refresh4');
	if (refresh4) {
		refresh4.addEventListener('click', () => {
			window.location = "";
		});
	};

	let cancelChange = document.getElementById('cancelChange');
	if (cancelChange) {
		cancelChange.addEventListener('click', () => {
			window.location = "";
		});
	};

	let addDanger = document.getElementById('addDanger');
	if (addDanger) {
		addDanger.addEventListener('click', () => {
			window.location = "";
		});
	};

	let click2 = document.getElementById('cancelChange');
	if (click2) {
		click2.addEventListener('click', () => {
			localStorage.setItem('current-warning', 0);
		});
	};

	function getFace(current_danger, current_warning) {
		if (current_danger + current_warning > 75) {
			document.getElementById("happy-face").src = crazy;
		} 
		else if (current_danger + current_warning > 50) {
			document.getElementById("happy-face").src = getting_crazy;
		} 
		else if (current_danger + current_warning > 25) {
			document.getElementById("happy-face").src = blush;
		} 
		else if (current_danger + current_warning >= 0 || current_danger + current_warning < 0) {
			document.getElementById("happy-face").src = happyface;
		} 
	}

  	return (
    <>
    <div className="title">
      Alcohmeter
    </div>
	<div className="body">
		<div className="main-container">
			<div className="alert alert-danger" role="alert">
				Calculation of Standard Drinks are not accurate and are collected from personal research. This is created for a hackathon as a Proof Of Concept. We hope to be able to get more accurate measurements in the future.
			</div>
			<form>
				<h6>Update Information:</h6>
				<label>
					Age: 
					<input type="text" name="age" onChange={changeAge.bind(this)}/>
				</label>
				<br/>
				<label>
					Weight:
					<input type="text" name="weight" onChange={changeWeight.bind(this)}/>
				</label>
				<br/>
				<label>
					Gender:
					<br/>
					<input type="radio" value="Male" name="gender" onClick={changeGender.bind(this)}/> Male
					<br/>
					<input type="radio" value="Female" name="gender" onClick={changeGender.bind(this)} /> Female
					<br/>
					<input type="radio" value="Other" name="gender" onClick={changeGender.bind(this)} /> Other
				</label>
				<p>Will you be driving?</p>
				<input type="radio" value="Yes" name="driving" onClick={changeDriving.bind(this)}/> Yes
				<br/>
				<input type="radio" value="No" name="driving" onClick={changeDriving.bind(this)}/> No
				<br/><br/>
				<input type="submit" value="Submit" id="reset-display"/>
			</form>
			<br/>
			<h6>Log what you are drinking</h6>
			<input type="radio" value={1.3 * 25} name="What are you having?" id='refresh1' onClick={changeChange.bind(this)}/> Corona Beer 1.3 SD<br/>
			<input type="radio" value={1.4 * 25} name="What are you having?" id='refresh2' onClick={changeChange.bind(this)}/> Victoria Bitter 1.4 SD<br/>
			<input type="radio" value={1.2 * 25} name="What are you having?" id='refresh3' onClick={changeChange.bind(this)}/> Somersby Apple Cider 1.2 SD<br/>
			<input type="radio" value={22 * 25} name="What are you having?" id='refresh4' onClick={changeChange.bind(this)}/> Jack Daniels 22 SD<br/>
			<br/>
			<input className='left-button' type="submit" value="Cancel" id='cancelChange'/>
			<input className='right-button' type="submit" value="Submit" id='addDanger'/>
			<br/><br/><br/>
			<h3>Current Information:</h3>
			<h5>All information on drinking limits is measured from these statistics</h5>
			<p>Age: {localStorage.getItem('age')}</p>
			<p>Gender: {localStorage.getItem('gender')}</p>
			<p>Permitted Standard Drinks: {localStorage.getItem('drinks')}</p>
			<div className="display">
				<div className="left">
					<img id="happy-face" alt="face" className="face-icon"/>
				</div>
				<div className="right">
					<ProgressBar>
						<ProgressBar striped variant="danger" now={localStorage.getItem('current-danger')} key={1} />
						<ProgressBar variant="warning" now={change} key={2} />
					</ProgressBar>
				</div>
			</div>
		</div>
		<footer>
			By: Nicholas Tandiono, Archibold Liang, Ben Pabian
		</footer>
	</div>
	</>
  );
}

export default App;
