import React, { useState, useEffect } from 'react';
import './App.css';
import './assets/css/style.css'
import Bar from './components/ToxinationBar/bar'
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.css';

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
			localStorage.setItem('gender', 100);
			localStorage.setItem('weight', 60);
			localStorage.setItem('current-danger', 80);
			localStorage.setItem('current-warning', 10);
			// Bug when it hits over 100
		}
	}
	
	function checkWarning(sum) {
		console.log("Checking End")
		if (sum > 100) {
			alert("Please Consider Not Drinking Anymore.")
		}
	}

	useEffect(() => {
		let current_danger = localStorage.getItem('current-danger');
		let current_warning = localStorage.getItem('current-warning');
		console.log(current_warning)
		checkData('current-danger')
		setChange(current_warning)
		setDanger(current_danger)
		setSuccess(100 - current_warning - current_danger)
		checkStandardDrinks()
		let sum = current_warning + current_danger
		// checkWarning(sum)
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

	function checkStandardDrinks() {
		let age = localStorage.getItem('age');
		let weight = localStorage.getItem('weight');
		let gender = localStorage.getItem('gender');
		let driving = localStorage.getItem('driving');

		if (age <= 18) {
			setStandardDrinks(0)
		}
		else {
			if (gender == 'Male' && driving == 'Yes') {
				setStandardDrinks(2)
			}
			else if (gender == 'Male' && driving == 'No') {
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

  	return (
    <>
    <div className="title">
      Alcohmeter
    </div>
	<div className="body">
		<div className="main-container">
			<div class="alert alert-danger" role="alert">
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

			<h1>Current Information:</h1>
			<h3>All information on drinking limits is measured from these statistics</h3>
			<p>Age: {localStorage.getItem('age')}</p>
			<p>Gender: {localStorage.getItem('gender')}</p>
			<p>Permitted Standard Drinks: {standardDrinks}</p>
			<ProgressBar>
				<ProgressBar striped variant="danger" now={danger} key={1} />
				<ProgressBar variant="warning" now={change} key={2} />
				<ProgressBar striped variant="success" now={success} key={3} />
			</ProgressBar>
			<img src='https://media.discordapp.net/attachments/787116842300211231/787283704678055976/0c5ff60d5d8498db4dd281254bc03449.jpg?width=587&height=663'></img>
		</div>
	</div>
	</>
  );
}

export default App;
