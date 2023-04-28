// eslint-disable-next-line no-unused-vars
const container = document.querySelector('.container');
const units = document.querySelector('.units');

function getUnit() {
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

function whichTempUnit(fTemp, cTemp) {
	const tempUnit = getUnit();
	if (tempUnit === 'f') {
		return `${fTemp}\u00B0F`;
	}
	return `${cTemp}\u00B0C`;
}

function whichImage(cloudiness) {
	if (cloudiness <= 10) {
		return 'sunny';
	}
	if (cloudiness <= 50) {
		return 'partly-cloudy';
	}
	if (cloudiness <= 90) {
		return 'mostly-cloudy';
	}
	return 'cloudy';
}

function displayWeatherData(fTemp, cTemp, wind, moisture, cloudiness) {
	const card = loadCard();
	const temp = whichTempUnit(fTemp, cTemp);
	const background = whichImage(cloudiness);
	card.style.backgroundImage = `url(./images/${background}.jpeg)`;
	card.innerHTML = `<p>${temp}</p>
                    <p>Wind: ${wind}mph</p>
                    <p>Humidity: ${moisture}%</p>
                    <p>Cloudiness: ${cloudiness}%</p>`;
}

async function getWeatherData(input) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=9a1a942742804fbcb9a214740232604&q=${input}`,
			{ mode: 'cors' }
		);
		const data = await response.json();
		const fTemp = data.current.temp_f;
		const cTemp = data.current.temp_c;
		const wind = data.current.wind_mph;
		const moisture = data.current.humidity;
		const cloudiness = data.current.cloud;
		displayWeatherData(fTemp, cTemp, wind, moisture, cloudiness);
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

function setUnit(event) {
	if (event.target.className === 'f') {
		units.classList.add('f');
		units.classList.remove('c');
	} else {
		units.classList.add('c');
		units.classList.remove('f');
	}
}

const fBtn = document.querySelector('#f-unit');
fBtn.addEventListener('click', setUnit);
const cBtn = document.querySelector('#c-unit');
cBtn.addEventListener('click', setUnit);
