// Get the root of the document
const root = document.documentElement;

// Easing function
function easeOutQuad(t) {
    return t * (2 - t);
}

// Previous mouse position
let prevX = 0;
let prevY = 0;

// Mouse move event listener
document.addEventListener('mousemove', (e) => {
    // Current mouse position
    const x = e.clientX;
    const y = e.clientY;

    // Calculate eased values
    const easedX = prevX + (x - prevX) * easeOutQuad(0.1);
    const easedY = prevY + (y - prevY) * easeOutQuad(0.1);

    // Update CSS variables
    root.style.setProperty('--x-coordinate', `${easedX}px`);
    root.style.setProperty('--y-coordinate', `${easedY}px`);

    // Update previous mouse position
    prevX = easedX;
    prevY = easedY;
});

let scrollIndex = 0;
let scrollIndexMax = Array.from(document.querySelectorAll('main>.view')).length;
let isScrolling = false;
function scrollDown() {
    if (isScrolling) return;
    isScrolling = true;

    scrollIndex = ++scrollIndex % scrollIndexMax;
    document.querySelector('main').scrollTo({
        left: 0,
        top: scrollIndex * window.innerHeight,
        behavior: 'smooth'
    });


    document.documentElement.style.setProperty('--scroll-index', scrollIndex);
    document.querySelectorAll('.background .view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.background .view').forEach(view => view.classList.remove('top-most'));
    document.querySelectorAll('main>.view').forEach(view => view.classList.remove('active'));
    document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.add('active');
    document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.add('top-most');
    document.querySelector(`main>.view:nth-child(${2 + scrollIndex})`).classList.add('active');

    setTimeout(() => {
        document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.remove('active');
    }, 400);
    setTimeout(() => {
        if (scrollIndex == scrollIndexMax - 1) {
            document.querySelector('main').scrollTo({
                left: 0,
                top: 0,
            });
            scrollIndex = 0

            document.querySelector(`main>.view:nth-child(${2 + scrollIndex})`).classList.add('active');
            document.querySelectorAll('.background .view').forEach(view => {
                view.style.transition = 'none';
                document.documentElement.style.setProperty('--scroll-index', scrollIndex);
                requestIdleCallback(() => {
                    view.style.transition = 'all var(--background-transition-duration) var(--background-transition-timing-function)';
                }
                );
            });

        }


        isScrolling = false;
    }, 1000);



}

document.addEventListener('click', (e) => {
    scrollDown();
});

setInterval(() => {
    scrollDown();
}, 4000);