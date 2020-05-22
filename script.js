// Write your JavaScript code here!
window.addEventListener('load', function() {
   this.fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      response.json().then( function(json) {
         let index = Math.floor(Math.random()*json.length);
         console.log(json[index].name);
         document.getElementById('missionTarget').innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src='${json[index].image}'></img>`;
      });
   });
   let form = document.querySelector('form');
   form.addEventListener('submit', function(event) {
      let pilotNameInput = document.querySelector('input[name=pilotName]');
      let coPilotNameInput = document.querySelector('input[name=copilotName]');
      let fuelLevelInput = document.querySelector('input[name=fuelLevel]');
      let cargoMassInput = document.querySelector('input[name=cargoMass]');

      document.getElementById('launchStatus').innerText = 'Awaiting Information Before Launch';
      document.getElementById('launchStatus').style.color= 'black';
      document.getElementById('pilotStatus').innerText = `Pilot ${pilotNameInput.value} is ready for launch`;
      document.getElementById('copilotStatus').innerText = `Co-Pilot ${coPilotNameInput.value} is ready for launch`;
      document.getElementById('fuelStatus').innerText = 'Fuel Level high enough for launch';
      document.getElementById('cargoStatus').innerText = 'Cargo Mass low enough for launch';

      if (!pilotNameInput.value.trim()|| !coPilotNameInput.value.trim()|| !fuelLevelInput.value.trim()|| !cargoMassInput.value.trim()) {
         alert('All fields are required!');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (typeof String(pilotNameInput.value) !== 'string' || pilotNameInput.value.trim().length === 0) {
         alert('Pilot name is required');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (!isNaN(Number(pilotNameInput.value)) && pilotNameInput.value.trim().length > 0) {
         alert('Invalid Input: No numbers can be used in pilot name field');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (typeof String(coPilotNameInput.value) !== 'string' || coPilotNameInput.value.trim().length === 0) {
         alert('Co-Pilot field is required');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (!isNaN(Number(coPilotNameInput.value)) && coPilotNameInput.value.trim().length > 0) {
         alert('Invalid Input: No numbers can be used in copilot name field');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (typeof Number(fuelLevelInput.value) !== 'number' || isNaN(Number(fuelLevelInput.value))) {
         alert('Invalid Input: only numbers can be used in fuel level input');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else if (typeof Number(cargoMassInput.value) !== 'number' || isNaN(Number(cargoMassInput.value))) {
         alert('Invalid Input: Only numbers can be used for cargo mass');
         event.preventDefault();
         userInput = false;
         document.getElementById('faultyItems').style.visibility = 'hidden';
      } else {
         userInput = true;
      }

      if (Number(fuelLevelInput.value) < 10000 && userInput) {
         document.getElementById('faultyItems').style.visibility = 'visible';
         document.getElementById('fuelStatus').innerText = 'Fuel level too low for launch'
         document.getElementById('launchStatus').innerText = 'Shuttle Not Ready for Launch';
         document.getElementById('launchStatus').style.color= 'red';
         fuelReady = false;
         event.preventDefault();
      } else {
         fuelReady = true;
      }
      if (Number(cargoMassInput.value) > 10000 && userInput) {
         document.getElementById('faultyItems').style.visibility = 'visible';
         document.getElementById('cargoStatus').innerText = 'Cargo mass too high for launch'
         document.getElementById('launchStatus').innerText = 'Shuttle Not Ready for Launch';
         document.getElementById('launchStatus').style.color= 'red';
         cargoReady = false;
         event.preventDefault();
      } else {
         cargoReady = true;
      }
      if (fuelReady && cargoReady && userInput) {
         document.getElementById('faultyItems').style.visibility = 'visible';
         document.getElementById('launchStatus').innerText = 'Shuttle is ready for launch';
         document.getElementById('launchStatus').style.color= 'green';
         event.preventDefault() 
      }
   });
});