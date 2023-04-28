// eslint-disable-next-line no-unused-vars
const container = document.querySelector('.container');
const units = document.querySelector('.units');

function getUnits() {
	if (units.classList.contains('c')) {
		return 'c';
	}
	return 'f';
}

function loadCard() {
	if (!document.querySelector('.card')) {
		const card = document.createElement('div');
		card.className = 'card';
		container.appendChild(card);
	}
	const card = document.querySelector('.card');
	return card;
}

function displayTemp(fTemp, cTemp) {
	const tempUnit = getUnits();
	const card = loadCard();
	if (tempUnit === 'f') {
		card.textContent = `${fTemp}\u00B0F`;
	} else {
		card.textContent = `${cTemp}\u00B0C`;
	}
}

function getTemperatureData(data) {
	const fTemp = data.current.temp_f;
	const cTemp = data.current.temp_c;
	displayTemp(fTemp, cTemp);
}

async function getWeatherData(input) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=9a1a942742804fbcb9a214740232604&q=${input}`,
			{ mode: 'cors' }
		);
		const weatherData = await response.json();
		getTemperatureData(weatherData);
	} catch (error) {
		console.log(error);
	}
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = e.target.querySelector('#location').value;
	location.toString().toLowerCase();
	getWeatherData(location);
});

function setUnits(event) {
	if (event.target.className === 'f') {
		units.classList.add('f');
		units.classList.remove('c');
	} else {
		units.classList.add('c');
		units.classList.remove('f');
	}
}

const fBtn = document.querySelector('#f-unit');
fBtn.addEventListener('click', setUnits);
const cBtn = document.querySelector('#c-unit');
cBtn.addEventListener('click', setUnits);
