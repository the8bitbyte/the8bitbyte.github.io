(function() {
    // Inject HTML elements
    const mouseBox = document.createElement('div');
    mouseBox.className = 'mouse-box';
    document.body.appendChild(mouseBox);

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.id = 'cursor';
    document.body.appendChild(cursor);

    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    cursorInner.id = 'cursor-in';
    document.body.appendChild(cursorInner);

    // Inject CSS styles
    const styles = `
        .mouse-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: solid #c0c0c0; 
            z-index: -2;
        }
        .cursor-inner.scroll {
            width: 10px;
            height: 10px;
        }
        .cursor.clicked {
            width: 20px;
            height: 20px;
        }
        .hide-cursor {
            cursor: none;
        }
        .trail {
            position: absolute;
            background-color: #ffde22;
            height: 5px; 
            width: 5px;
            border-radius: 28px;
            z-index: 1000;
            pointer-events: none;
        }
        .cursor-inner.hover {
            width: 18.75px;
            height: 18.75px;
            border-radius: 5px;
        }
        .cursor.scroll {
            height: 40px;
            width: 20px;
            border-radius: 10px;
        }
        .cursor {
            width: 30px;
            height: 30px;
            background-color: rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(3px);
            position: fixed;
            transform: translate(-50%, -50%);
            z-index: 100000;
        }
        .cursor-inner {
            width: 15px;
            height: 15px;
            background-color: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            position: fixed;
            transform: translate(-50%, -50%);
            z-index: 100000;
        }
        .cursor.hover {
            border-radius: 8px;
        }
        .cursor, .cursor-inner {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease, border-radius 0.2s ease;
            z-index: 10000;
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // JavaScript logic for cursor
    let tP = { x: 0, y: 0 };
    let iCP = { x: 0, y: 0 };
    let lastScrollY = window.scrollY;
    const cursorEl = document.querySelector('.cursor');
    const cursorInnerEl = document.querySelector('.cursor-inner');

    document.addEventListener('mousemove', (e) => {
        tP.x = e.pageX;
        tP.y = e.pageY;
        updateCursorPosition();
    });

    window.addEventListener('scroll', () => {
        const scrollDiff = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        tP.y += scrollDiff;
        updateCursorPosition();
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
        cursorInner.classList.add('clicked');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
        cursorInner.classList.remove('clicked');
    });

    document.addEventListener('wheel', () => {
        cursor.classList.add('scroll');
        cursorInner.classList.add('scroll');
        setTimeout(() => {
            cursor.classList.remove('scroll');
            cursorInner.classList.remove('scroll');
        }, 150);
    });

    function updateCursorPosition() {
        cursorEl.style.left = `${tP.x}px`;
        cursorEl.style.top = `${tP.y}px`;
        cursorInnerEl.style.left = `${tP.x}px`;
        cursorInnerEl.style.top = `${tP.y}px`;
    }

    function animateInnerCursor() {
        const dx = (tP.x - iCP.x) * 0.2;
        const dy = (tP.y - iCP.y) * 0.2;
        iCP.x += dx;
        iCP.y += dy;
        cursorInnerEl.style.left = `${iCP.x}px`;
        cursorInnerEl.style.top = `${iCP.y}px`;
        requestAnimationFrame(animateInnerCursor);
    }
    animateInnerCursor();
})();
