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
const starImage = new Image();
starImage.src = "Images/star1.png";
let starWidth = window.innerWidth;
let starHeight = window.innerHeight;

function resizeStarCanvas() {
  starWidth = window.innerWidth;
  starHeight = window.innerHeight;
  const pixelRatio = window.devicePixelRatio || 1;
  starCanvas.width = Math.round(starWidth * pixelRatio);
  starCanvas.height = Math.round(starHeight * pixelRatio);
  starContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  starContext.imageSmoothingEnabled = false;
}

resizeStarCanvas();
window.addEventListener("resize", resizeStarCanvas);

const stars = [];
const starCount = 100;

// Create the stars.
for (let index = 0; index < starCount; index++) {
  const star = {
    x: Math.random(),
    y: Math.random(),
    size: 8,
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
  updateCursorTrail(deltaSeconds);

  starContext.clearRect(
    0,
    0,
    starWidth,
    starHeight
  );

  starContext.fillStyle = "white";

  for (const star of stars) {
    if (!starImage.complete || starImage.naturalWidth === 0) break;
    const wave = Math.sin(
      seconds * star.gleamSpeed + star.phase
    );

    const brightness = 0.1 + ((wave + 1) / 2) * 0.9;
    starContext.globalAlpha = brightness;
    starContext.drawImage(
      starImage,
      Math.floor(star.x * starWidth),
      Math.floor(star.y * starHeight),
      star.size,
      star.size
    );
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
      tailX > starWidth || tailY > starHeight;

    if (tailHasLeftScreen) {
      // Reset above the screen and wait before the next meteor.
      meteor.x = Math.random() * starWidth * 0.7;
      meteor.y = -20;
      meteor.velocityX = 300 + Math.random() * 200;
      meteor.velocityY = 200 + Math.random() * 150;
      meteorDelay = 1 + Math.random() * 3;
    }
  }

  requestAnimationFrame(animateStars);
}

requestAnimationFrame(animateStars);

// Five translucent copies follow one another using the star animation loop.
const reducedCursorMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const cursorCopies = [];
const cursorPosition = { x: 0, y: 0, visible: false };

document.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse" || reducedCursorMotion.matches) return;
  cursorPosition.x = event.clientX;
  cursorPosition.y = event.clientY;
  cursorPosition.visible = true;

  while (cursorCopies.length < 5) {
    const element = document.createElement("div");
    element.className = "cursor-trail";
    element.hidden = true;
    element.setAttribute("aria-hidden", "true");
    document.body.append(element);
    cursorCopies.push({ element, x: event.clientX, y: event.clientY });
  }
});

document.documentElement.addEventListener("mouseleave", () => {
  cursorPosition.visible = false;
});
window.addEventListener("blur", () => {
  cursorPosition.visible = false;
});

function updateCursorTrail(deltaSeconds) {
  let targetX = cursorPosition.x;
  let targetY = cursorPosition.y;
  const follow = 1 - Math.exp(-12 * deltaSeconds);

  for (const copy of cursorCopies) {
    const visible = cursorPosition.visible && !reducedCursorMotion.matches;
    if (copy.element.hidden) {
      copy.x = targetX;
      copy.y = targetY;
    }
    copy.element.hidden = !visible;
    copy.x += (targetX - copy.x) * follow;
    copy.y += (targetY - copy.y) * follow;
    copy.element.style.transform = `translate3d(${copy.x - 16}px, ${copy.y - 16}px, 0)`;
    targetX = copy.x;
    targetY = copy.y;
  }
}
