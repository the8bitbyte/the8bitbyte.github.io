let cursor = document.querySelector('.cursor');
let cursorInner = document.querySelector('.cursor-inner');
let tooltipEnabled = false;
let scrollTimeout = null;
let innerCursorPosition = { x: 0, y: 0 };
let targetPosition = { x: 0, y: 0 };
let lastScrollY = window.scrollY;

// Update cursor position on mouse movement
document.addEventListener('mousemove', (e) => {
    targetPosition.x = e.pageX;
    targetPosition.y = e.pageY;
    updateCursorPosition();
});

window.addEventListener('scroll', () => {
    const scrollDiff = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    targetPosition.y += scrollDiff;
    updateCursorPosition();
});

function updateCursorPosition() {
    cursor.style.left = `${targetPosition.x}px`;
    cursor.style.top = `${targetPosition.y}px`;
    cursorInner.style.left = `${targetPosition.x}px`;
    cursorInner.style.top = `${targetPosition.y}px`;
}

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicked');
    cursorInner.classList.add('clicked');
});
document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicked');
    cursorInner.classList.remove('clicked');
});
document.addEventListener('wheel', () => {
    if (!tooltipEnabled) {
        cursor.classList.add('scroll');
        cursorInner.classList.add('scroll');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            cursor.classList.remove('scroll');
            cursorInner.classList.remove('scroll');
        }, 150);
    }
});

function updateInnerCursor() {
    const dx = (targetPosition.x - innerCursorPosition.x) * 0.2;
    const dy = (targetPosition.y - innerCursorPosition.y) * 0.2;
    innerCursorPosition.x += dx;
    innerCursorPosition.y += dy;
    cursorInner.style.left = `${innerCursorPosition.x}px`;
    cursorInner.style.top = `${innerCursorPosition.y}px`;
    requestAnimationFrame(updateInnerCursor);
}
requestAnimationFrame(updateInnerCursor);

// Tooltip functions
function showTooltip(text) {
    cursor.classList.add('tooltip');
    cursor.innerHTML = text;
    tooltipEnabled = true;
}

function hideTooltip() {
    cursor.classList.remove('tooltip');
    cursor.innerHTML = '';
    tooltipEnabled = false;
    innerCursorPosition = { x: targetPosition.x, y: targetPosition.y };
    updateCursorPosition();
}

function updateTooltip(text) {
    cursor.innerHTML = text;
}

// Add hover effects
function addHoverEffects() {
    const elements = [
        document.getElementById('nav-lnk'),
        ...document.querySelectorAll('.cta-button')
    ].filter(Boolean);

    elements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
            cursorInner.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorInner.classList.remove('hover');
        });
    });
}

console.log("What are you doing snooping around in here?");
