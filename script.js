document.addEventListener("DOMContentLoaded", () => {
  const names = ["The8bitbyte", "rAEuyq5NrpNFT6BY", "NotSoMeanPlease", "Zeus_gameover"];
  const nameElement = document.querySelector("header .hero h1");

  if (!nameElement) {
    return;
  }

  const fadeDuration = 500;
  const displayDuration = 4000;
  let nameIndex = 0;

  function updateName() {
    nameElement.style.transition = `opacity ${fadeDuration}ms`;
    nameElement.style.opacity = 0;

    setTimeout(() => {
      nameIndex = (nameIndex + 1) % names.length;
      const newName = names[nameIndex];
      nameElement.textContent = newName;


      nameElement.setAttribute("data-shadow", newName);

      nameElement.style.opacity = 1;
    }, fadeDuration);
  }

  setInterval(updateName, displayDuration + fadeDuration * 2);
});







let amnt = 12;
var dots = [],
    mouse = {
        x: 0,
        y: 0
    };


function interpolatePurpleHue(startHue, index, total) {
    const hueMin = 269.88;
    const hueMax = 300;
    const hueRange = hueMax - hueMin;
    const hueIncrement = hueRange / total;
    const hue = startHue + index * hueIncrement;
    return Math.min(Math.max(hue, hueMin), hueMax);
}


const startHue = 269.88;


var Dot = function(index) {
    this.x = 0;
    this.y = 0;
    this.node = (function() {
        var n = document.createElement("div");
        n.className = "trail";
        n.id = "trail-el";


        const hue = interpolatePurpleHue(startHue, index, amnt);
        n.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        document.body.appendChild(n);
        return n;
    }());
};

Dot.prototype.draw = function() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
};


for (var i = 0; i < amnt; i++) {
    var d = new Dot(i);
    dots.push(d);
}


function draw() {
    var x = mouse.x,
        y = mouse.y;


    dots.forEach(function(dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];

        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * 0.6;
        y += (nextDot.y - dot.y) * 0.6;
    });
}


addEventListener("mousemove", function(event) {
    mouse.x = event.pageX - 3;
    mouse.y = event.pageY;
});


let lastScrollY2 = window.scrollY;
window.addEventListener('scroll', () => {
    const scrollDiff = window.scrollY - lastScrollY2;
    lastScrollY2 = window.scrollY;

    mouse.y += scrollDiff;
    draw();
});


function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();

