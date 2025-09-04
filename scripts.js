function playMusic(trackName) {
  const audio = document.getElementById("audioPlayer");
  if (!audio) return;

  try {
    // Reset, set source, and play with proper loading
    const newSrc = `./Music/${trackName}`;
    if (audio.src !== newSrc) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = newSrc;
    }
    audio.load();
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // Some browsers block autoplay; ensure it's triggered by a user gesture
        // Fallback: prompt user interaction if needed
        alert('Tap the play button on the player to start audio.');
      });
    }
  } catch (_) {
    alert('Failed to play audio.');
  }
}

// Dark mode toggle removed - website stays in dark mode


