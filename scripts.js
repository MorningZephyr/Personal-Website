/*** You will not need this file until Unit 5 ***/

function playMusic(trackName) {
  const audio = document.getElementById("audioPlayer");

  // Change the source to desired music and play it
  audio.src = `./music/${trackName}`;     
  audio.play()
}

/*** Dark Mode ***

Purpose:
- Use this starter code to add a dark mode feature to your website.

When To Modify:
- [ ] Project 5 (REQUIRED FEATURE) 
- [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button")
// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode)

/*** Form Handling ***

Purpose:
- When the user submits the RSVP form, the name and state they 
  entered should be added to the list of participants.

When To Modify:
- [ ] Project 6 (REQUIRED FEATURE)
- [ ] Project 6 (STRETCH FEATURE) 
- [ ] Project 7 (REQUIRED FEATURE)
- [ ] Project 9 (REQUIRED FEATURE)
- [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
let submitButton = document.getElementById("rsvp-button")

const addParticipant = (person) => {
// Step 2: Write your code to manipulate the DOM here
let name = person.name
let email = person.email
let songRequest = person.songRequest
console.log(name, email, songRequest)

const newRSVP = document.createElement("p")
newRSVP.textContent = `🎹${name} has requested "${songRequest}"`

const rsvpForm = document.querySelector(".rsvp-participants")
rsvpForm.appendChild(newRSVP)

event.preventDefault();
}




// Step 2: Write the callback function
const validateForm = () => {

let containsErrors = false;

let rsvpInputs = document.getElementById("rsvp-form").elements;

let person = {
  name: rsvpInputs[0].value,
  email: rsvpInputs[1].value,
  songRequest : rsvpInputs[2].value

}
// TODO: Loop through all inputs
for(let i = 0; i < rsvpInputs.length; i++) {
  if(rsvpInputs[i].value.length < 2) {
    containsErrors = true
    rsvpInputs[i].classList.add("error")

  } else {
    rsvpInputs[i].classList.remove("error")
  }
}

// TODO: If no errors, call addParticipant() and clear fields
if (!containsErrors) {
  addParticipant(person);
  toggleModal(person)

  for (let i = 0; i < rsvpInputs.length; i++) {
    rsvpInputs[i].value = "";
  }

}

}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
submitButton.addEventListener("click", validateForm)

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/


const toggleModal = (person) => {
let modal = document.querySelector("#success-modal")
let modalContent = document.querySelector("#modal-text")
// TODO: Update modal display to flex
modal.style.display = "flex"

// TODO: Update modal text to personalized message
modalContent.textContent = `Thank you for your response, ${person.name}!`


// Set modal timeout to 5 seconds
setTimeout(()=>{
  modal.style.display = "none"

}, 5000);

}

