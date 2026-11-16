# Star background customization

Edit the `// Star Logic` section in `scripts.js`, save, and refresh your browser to preview changes. Stars are small circles with independent brightness cycles. Near peak brightness, each star briefly grows and glows. Meteors travel diagonally down and right with a fading trail.

### Stars and gleaming

| Setting | Current value or expression | Effect |
| --- | --- | --- |
| Number of stars | `starCount = 150` | Increase for a denser sky. |
| Base diameter | `size: Math.floor(Math.random() * 3) + 1` | Random whole-pixel diameters from 1 to 3 before gleam enlargement. Change `3` for the number of possible sizes and `1` for the minimum. |
| Starting phase | `phase: Math.random() * Math.PI * 2` | Starts stars at different points in their brightness cycles. |
| Gleaming speed | `gleamSpeed: 0.5 + Math.random()` | Random angular speeds from 0.5 up to 1.5 radians per second, giving cycles of about 4.2–12.6 seconds. Lower values produce slower gleaming. |
| Brightness | `0.3 + ((wave + 1) / 2) * 0.7` | Opacity ranges from 0.3 to 1. The first number is the minimum, and the last is the variation. Keep their sum at or below 1. |
| Gleam duration | `Math.pow((wave + 1) / 2, 8)` | A higher exponent concentrates the shine into a shorter peak. A lower positive exponent broadens it. |
| Glow strength | `shadowBlur = gleam * 8` | Sets the maximum glow blur to 8. Increase for a softer, wider halo. |
| Peak enlargement | `(star.size / 2) * (1 + gleam * 0.5)` | Makes the radius up to 50% larger at peak brightness. Change `0.5` to adjust the growth. |
| Color | `fillStyle = "white"` and `shadowColor = "white"` | Set the fill inside `animateStars` and the shadow color to customize the stars and halo. |

For slower gleaming, try `gleamSpeed: 0.2 + Math.random() * 0.4`. Each star keeps its own randomized phase and speed. Star positions are stored as fractions of the canvas dimensions so they adapt when the window resizes.

### Meteors

| Setting | Current value or expression | Effect |
| --- | --- | --- |
| First appearance | `meteorDelay = 2` | Waits about 2 seconds of animation time before the first meteor. |
| Initial position | `x: 50`, `y: 50` in `meteor` | Starting coordinates of the first meteor in pixels. |
| Initial velocity | `velocityX: 400`, `velocityY: 250` | First meteor's horizontal and vertical speed in pixels per second. |
| Trail length | `trailLength: 100` | Trail length in pixels. |
| Trail thickness | `starContext.lineWidth = 2` | Width of the meteor's trail in pixels. |
| Head size | `fillRect(meteor.x - 2, meteor.y - 2, 4, 4)` | Draws a 4 × 4 pixel head centered on the meteor. Adjust the offsets to half the dimensions when resizing. |
| Respawn position | `Math.random() * starCanvas.width * 0.7`, `y = -20` | Starts later meteors above the screen, within the leftmost 70% of its width. |
| Respawn horizontal speed | `300 + Math.random() * 200` | Random speed from 300 up to 500 pixels per second. |
| Respawn vertical speed | `200 + Math.random() * 150` | Random speed from 200 up to 350 pixels per second. Increase relative to horizontal speed for steeper descent. |
| Pause between meteors | `3 + Math.random() * 5` | Waits 3–8 seconds after the previous meteor's tail leaves the screen. For 6–12 seconds, use `6 + Math.random() * 6`. |
| Trail color | `trail.addColorStop(...)` | The two RGBA colors define the transparent tail and opaque head. Change their RGB values together to tint the trail. |

Keep both velocity components positive for the current down-right movement and exit detection. Later meteors use the values in the respawn block, so edit those as well as the initial object when changing speed. Timing uses frame deltas capped at 0.05 seconds to prevent large jumps after interruptions.

### Background visibility

In `styles.css`, `#star-background` fills the viewport with `position: fixed`, sits behind content with `z-index: -1`, and lets clicks pass through with `pointer-events: none`. The body's `isolation: isolate` keeps the canvas in its stacking context. The hero uses `background: transparent` so the stars show through. Solid section backgrounds cover the stars.

More stars, larger glow blurs, and continuous animation can increase graphics work, especially on phones. Adjust one setting at a time and preview the result.
