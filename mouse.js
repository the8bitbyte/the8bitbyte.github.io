document.addEventListener("DOMContentLoaded", () => {
    let cursor = document.querySelector('.cursor');
    let cursorInner = document.querySelector('.cursor-inner');

    function getOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "Other";
    }

    const os = getOperatingSystem();

    if (os === "iOS" || os === "Android") {
        if (cursor) cursor.style.display = "none";
        if (cursorInner) cursorInner.style.display = "none";
        document.body.classList.add("hide-cursor");
    } else {
        if (cursor && cursorInner) {
            let targetPosition = { x: 0, y: 0 };
            let innerCursorPosition = { x: 0, y: 0 };
            let lastScrollY = window.scrollY;

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
                if (cursor && cursorInner) {
                    cursor.style.left = `${targetPosition.x}px`;
                    cursor.style.top = `${targetPosition.y}px`;
                    cursorInner.style.left = `${targetPosition.x}px`;
                    cursorInner.style.top = `${targetPosition.y}px`;
                }
            }

            document.addEventListener('mousedown', () => {
                cursor?.classList.add('clicked');
                cursorInner?.classList.add('clicked');
            });

            document.addEventListener('mouseup', () => {
                cursor?.classList.remove('clicked');
                cursorInner?.classList.remove('clicked');
            });

            document.addEventListener('wheel', () => {
                cursor?.classList.add('scroll');
                cursorInner?.classList.add('scroll');
                setTimeout(() => {
                    cursor?.classList.remove('scroll');
                    cursorInner?.classList.remove('scroll');
                }, 150);
            });

            function updateInnerCursor() {
                const dx = (targetPosition.x - innerCursorPosition.x) * 0.15;
                const dy = (targetPosition.y - innerCursorPosition.y) * 0.15;
                innerCursorPosition.x += dx;
                innerCursorPosition.y += dy;
                if (cursorInner) {
                    cursorInner.style.left = `${innerCursorPosition.x}px`;
                    cursorInner.style.top = `${innerCursorPosition.y}px`;
                }
                requestAnimationFrame(updateInnerCursor);
            }

            requestAnimationFrame(updateInnerCursor);

            const links = document.querySelectorAll('a');
            links.forEach((link) => {
                link.addEventListener('mouseover', () => {
                    cursor?.classList.add('hover');
                    cursorInner?.classList.add('hover');
                });
                link.addEventListener('mouseleave', () => {
                    cursor?.classList.remove('hover');
                    cursorInner?.classList.remove('hover');
                });
            });
        } else {
            console.error('Cursor elements are missing from the DOM.');
        }
    }
});
