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
	const checkData = key => {
    	const data = localStorage.getItem(key);
    	if (!data) {
			console.log('Setting default')
			localStorage.setItem('age', 0);
			localStorage.setItem('gender', 100);
			localStorage.setItem('weight', 60);
			localStorage.setItem('current-danger', 90);
			localStorage.setItem('current-warning', 20);
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
		checkData()
		setChange(current_warning)
		setDanger(current_danger)
		setSuccess(100 - current_warning - current_danger)
		let sum = current_warning + current_danger
		checkWarning(sum)
	}, [])

  	return (
    <>
    <div className="title">
      Alcohmeter
    </div>
	<ProgressBar>
		<ProgressBar striped variant="danger" now={danger} key={1} />
		<ProgressBar variant="warning" now={change} key={2} />
		<ProgressBar striped variant="success" now={success} key={3} />
	</ProgressBar>
	<img src='https://media.discordapp.net/attachments/787116842300211231/787283704678055976/0c5ff60d5d8498db4dd281254bc03449.jpg?width=587&height=663'></img>
    </>
  );
}

export default App;
