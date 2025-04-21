function playMusic(trackName) {
    const audio = document.getElementById("audioPlayer");

    // Change the source to desired music and play it
    audio.src = `./music/${trackName}`;     
    audio.play()
}

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button")
// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode)

