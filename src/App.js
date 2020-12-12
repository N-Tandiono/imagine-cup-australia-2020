import React, { useState, useEffect } from 'react';
import './App.css';
import './assets/css/style.css'
import Bar from './components/ToxinationBar/bar'
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
			localStorage.setItem('driving', 'no');
			localStorage.setItem('gender', 'Male');
			localStorage.setItem('weight', 60);
			localStorage.setItem('current-danger', 0);
			localStorage.setItem('current-warning', 0);
			// Bug when it hits over 100
		}
	}
	
	function checkWarning(sum) {
		console.log("Checking End")
		// if (sum > 100) {
		// 	alert("Please Consider Not Drinking Anymore.")
		// }
	}

	useEffect(() => {
		let current_danger = localStorage.getItem('current-danger');
		let current_warning = localStorage.getItem('current-warning');
		console.log(current_warning)
		checkData('current-danger')
		setChange(current_warning * 25)
		setDanger(current_danger * 25)
		setSuccess(100)
		checkStandardDrinks()
		let sum = current_warning + current_danger
		checkWarning(sum)
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

		if (age <= 18) {
			setStandardDrinks(0)
		}
		else {
			if ((gender == 'Male' || 'Other')&& driving == 'Yes') {
				setStandardDrinks(2)
			}
			else if ((gender == 'Male' || 'Other') && driving == 'No') {
				setStandardDrinks(4)
			}
			if (gender == 'Female' && driving == 'Yes') {
				setStandardDrinks(2)
			}
			else if (gender == 'Female' && driving == 'No') {
				setStandardDrinks(4)
			}
		}
	}
	let click = document.getElementById('addDanger');
	if (click) {
		click.addEventListener('click', () => {
			let current_warning = localStorage.getItem('current-warning');
			let current_danger = localStorage.getItem('current-danger');
			let new_sum = JSON.parse(current_warning) + JSON.parse(current_danger);
			localStorage.setItem('current-danger', new_sum);
			localStorage.setItem('current-warning', 0);
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

  	return (
    <>
    <div className="title">
      Alcohmeter
    </div>
	<div className="body">
		<div className="main-container">
			<div className="alert alert-danger" role="alert">
				Calculation of Standard Drinks are not accurate and are collected from research. This is created for a hackathon as a Proof Of Concept. We hope to be able to get more accurate measurements in the future.
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
				<input type="submit" value="Submit"/>
			</form>
			<br/>
			<h6>Log what you are drinking</h6>
			<input type="radio" value="1.3" name="What are you having?" id='refresh1' onClick={changeChange.bind(this)}/> Corona Beer 1.3 SD<br/>
			<input type="radio" value="1.4" name="What are you having?" id='refresh2' onClick={changeChange.bind(this)}/> Victoria Bitter 1.4 SD<br/>
			<input type="radio" value="1.2" name="What are you having?" id='refresh3' onClick={changeChange.bind(this)}/> Somersby Apple Cider 1.2 SD<br/>
			<br/>
			<input className='left-button' type="submit" value="Cancel" id='cancelChange'/>
			<input className='right-button' type="submit" value="Submit" id='addDanger'/>
			<br/><br/><br/>
			<h3>Current Information:</h3>
			<h5>All information on drinking limits is measured from these statistics</h5>
			<p>Age: {localStorage.getItem('age')}</p>
			<p>Gender: {localStorage.getItem('gender')}</p>
			<p>Permitted Standard Drinks: {standardDrinks}</p>
			<div className="display">
				<div className="left">
					<img src={happyface} id="happy-face" alt="face" className="face-icon"/>
				</div>
				<div className="right">
					<ProgressBar>
						<ProgressBar striped variant="danger" now={danger} key={1} />
						<ProgressBar variant="warning" now={change} key={2} />
						<ProgressBar striped variant="success" now={success} key={3} />
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
