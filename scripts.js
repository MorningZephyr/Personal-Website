
function playMusic(trackName) {
  const audio = document.getElementById("audioPlayer");

  // Change the source to desired music and play it
  audio.src = `./music/${trackName}`;     
  audio.play()
}

// Dark mode toggle removed - website stays in dark mode


