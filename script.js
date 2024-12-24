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

      // Update the data-shadow attribute for the pseudo-element
      nameElement.setAttribute("data-shadow", newName);

      nameElement.style.opacity = 1;
    }, fadeDuration);
  }

  setInterval(updateName, displayDuration + fadeDuration * 2);
});


