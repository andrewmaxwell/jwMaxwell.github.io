const canvas = document.getElementById("C");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.dirX = -this.dirX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.dirY = -this.dirY;
    }

    this.x += this.dirX;
    this.y += this.dirY;
    this.draw();
  }
}

const init = () => {
  const particles = [];
  const particleCount = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < particleCount; ++i) {
    const size = Math.random() * 5 + 1;
    particles.push(
      new Particle(
        Math.random() * (innerWidth - size * 2 - size * 2),
        Math.random() * (innerHeight - size * 2 - size * 2),
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5,
        size
      )
    );
  }

  return particles;
};

const connect = (particles) => {
  for (let i = 0; i < particles.length; ++i) {
    for (let j = i; j < particles.length; ++j) {
      const dist =
        (particles[i].x - particles[j].x) ** 2 +
        (particles[i].y - particles[j].y) ** 2;
      const maxDist = (canvas.width / 7) * (canvas.height / 7);
      if (dist < (canvas.width / 7) * (canvas.height / 7)) {
        const opacity = (maxDist - dist) / maxDist;
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};

const draw = (particles) => {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  connect(particles);
  particles.map((t) => t.update());
};

init();
draw();

const main = (() => {
  const particles = init();
  draw(particles);
})();
