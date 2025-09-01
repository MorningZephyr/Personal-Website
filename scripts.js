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


