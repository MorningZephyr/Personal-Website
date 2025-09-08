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

// Project Modal Functions
function openModal(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside the modal content
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('project-modal')) {
        const modal = event.target;
        const projectId = modal.id.replace('-modal', '');
        closeModal(projectId);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            const projectId = activeModal.id.replace('-modal', '');
            closeModal(projectId);
        }
    }
});


