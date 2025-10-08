# Defense in Depth Study Hub

A single-page reference site organizing physical and device security concepts for cybersecurity learners. The site includes layered study sections, diagrams, and a quiz/flashcard mode for quick review.

## Project Structure

- `index.html` – main page with navigation, content sections, and quiz shell.
- `assets/css/style.css` – global styling (glassmorphism theme, responsive layout).
- `assets/js/main.js` – navigation toggle, icon rendering, quiz/flashcard logic.

## Getting Started

Open the site directly in a browser or serve it locally:

```bash
cd gmetrixcyberq1
python3 -m http.server 8080
```

Then visit <http://localhost:8080>.

## Customization Notes

- Update the question bank in `assets/js/main.js` (`questions` array) to tailor quiz content.
- Modify colors or typography via CSS variables at the top of `assets/css/style.css`.
- Lucide icons are loaded from a CDN; swap `data-lucide` values in the HTML to change visuals.