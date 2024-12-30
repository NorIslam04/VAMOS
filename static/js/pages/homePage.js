const circles = document.querySelectorAll('.circle');

// Position initiale aléatoire des cercles
circles.forEach(circle => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
});