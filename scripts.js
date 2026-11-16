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

// Star Logic
const starCanvas = document.getElementById("star-background");
const starContext = starCanvas.getContext("2d");

function resizeStarCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}

resizeStarCanvas();
window.addEventListener("resize", resizeStarCanvas);

const stars = [];
const starCount = 150;

// Create the stars.
for (let index = 0; index < starCount; index++) {
  const star = {
    x: Math.random(),
    y: Math.random(),
    size: Math.floor(Math.random() * 3) + 1,
    phase: Math.random() * Math.PI * 2,
    gleamSpeed: 0.5 + Math.random()
  };

  stars.push(star);
}
const meteor = {
  x: 50,
  y: 50,
  velocityX: 400,
  velocityY: 250,
  trailLength: 100
};

let meteorDelay = 2;
let previousTimestamp = null;

function animateStars(timestamp) {
  const seconds = timestamp / 1000;
  let deltaSeconds = 0;

  if (previousTimestamp !== null) {
    deltaSeconds = Math.min(
      (timestamp - previousTimestamp) / 1000,
      0.05
    );
  }

  previousTimestamp = timestamp;

  starContext.clearRect(
    0,
    0,
    starCanvas.width,
    starCanvas.height
  );

  starContext.fillStyle = "white";

  for (const star of stars) {
    const wave = Math.sin(
      seconds * star.gleamSpeed + star.phase
    );

    const brightness = 0.3 + ((wave + 1) / 2) * 0.7;
    // Concentrate the glow around the brightest part of each star's cycle.
    const gleam = Math.pow((wave + 1) / 2, 8);

    starContext.globalAlpha = brightness;
    starContext.shadowColor = "white";
    starContext.shadowBlur = gleam * 8;
    starContext.beginPath();
    starContext.arc(
      star.x * starCanvas.width,
      star.y * starCanvas.height,
      (star.size / 2) * (1 + gleam * 0.5),
      0,
      Math.PI * 2
    );
    starContext.fill();
  }

  starContext.globalAlpha = 1;
  starContext.shadowBlur = 0;

  meteorDelay -= deltaSeconds;

  if (meteorDelay <= 0) {
    // Move the meteor.
    meteor.x += meteor.velocityX * deltaSeconds;
    meteor.y += meteor.velocityY * deltaSeconds;

    // Find the direction of travel.
    const speed = Math.hypot(
      meteor.velocityX,
      meteor.velocityY
    );

    const directionX = meteor.velocityX / speed;
    const directionY = meteor.velocityY / speed;

    // Position the tail behind the meteor.
    const tailX = meteor.x - directionX * meteor.trailLength;
    const tailY = meteor.y - directionY * meteor.trailLength;

    // Fade from a transparent tail to a bright head.
    const trail = starContext.createLinearGradient(
      tailX,
      tailY,
      meteor.x,
      meteor.y
    );

    trail.addColorStop(0, "rgba(255, 255, 255, 0)");
    trail.addColorStop(1, "rgba(255, 255, 255, 1)");

    starContext.strokeStyle = trail;
    starContext.lineWidth = 2;

    starContext.beginPath();
    starContext.moveTo(tailX, tailY);
    starContext.lineTo(meteor.x, meteor.y);
    starContext.stroke();

    // Draw the bright head.
    starContext.fillStyle = "white";
    starContext.fillRect(meteor.x - 2, meteor.y - 2, 4, 4);
    const tailHasLeftScreen =
      tailX > starCanvas.width || tailY > starCanvas.height;

    if (tailHasLeftScreen) {
      // Reset above the screen and wait before the next meteor.
      meteor.x = Math.random() * starCanvas.width * 0.7;
      meteor.y = -20;
      meteor.velocityX = 300 + Math.random() * 200;
      meteor.velocityY = 200 + Math.random() * 150;
      meteorDelay = 3 + Math.random() * 5;
    }
  }

  requestAnimationFrame(animateStars);
}

requestAnimationFrame(animateStars);
