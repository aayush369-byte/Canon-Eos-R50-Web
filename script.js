/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 650);

});


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileNav =
    document.getElementById("mobileNav");

const mobileNavLinks =
    mobileNav.querySelectorAll("a");


menuButton.addEventListener("click", () => {

    mobileNav.classList.toggle("active");

});


mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

    });

});


/* =====================================================
   HERO VIDEO
===================================================== */

const heroVideo =
    document.querySelector(".hero-video");

if (heroVideo) {

    heroVideo.addEventListener(
        "loadeddata",
        () => {

            heroVideo
                .play()
                .catch(() => {});

        }
    );

}


/* =====================================================
   GALLERY
===================================================== */

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );


const galleryItems =
    Array.from(galleryCards).map(card => ({

        image:
            card.dataset.image,

        title:
            card.dataset.title,

        description:
            card.dataset.description

    }));


/* =====================================================
   VIEWER ELEMENTS
===================================================== */

const viewer =
    document.getElementById("viewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerTitle =
    document.getElementById("viewerTitle");

const viewerDescription =
    document.getElementById(
        "viewerDescription"
    );

const viewerCount =
    document.getElementById(
        "viewerCount"
    );

const viewerNumber =
    document.getElementById(
        "viewerNumber"
    );

const viewerProgress =
    document.getElementById(
        "viewerProgress"
    );

const viewerClose =
    document.getElementById(
        "viewerClose"
    );

const viewerPrevious =
    document.getElementById(
        "viewerPrevious"
    );

const viewerNext =
    document.getElementById(
        "viewerNext"
    );


let currentImage = 0;


/* =====================================================
   FORMAT NUMBER
===================================================== */

function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


/* =====================================================
   UPDATE VIEWER
===================================================== */

function updateViewer(direction = 1) {

    const item =
        galleryItems[currentImage];


    /*
     * Start transition.
     */

    viewerImage.classList.remove(
        "visible"
    );


    viewerImage.style.transform =
        direction >= 0
            ? "translateX(30px) scale(.97)"
            : "translateX(-30px) scale(.97)";


    setTimeout(() => {


        /*
         * Change image.
         */

        viewerImage.src =
            item.image;

        viewerImage.alt =
            `EOS R50 ${item.title}`;


        /*
         * Change text.
         */

        viewerTitle.textContent =
            item.title;

        viewerDescription.textContent =
            item.description;


        /*
         * Change counters.
         */

        viewerNumber.textContent =
            formatNumber(
                currentImage + 1
            );


        viewerCount.textContent =
            `${formatNumber(currentImage + 1)} / ${formatNumber(galleryItems.length)}`;


        /*
         * Change progress.
         */

        const progress =
            (
                (currentImage + 1)
                /
                galleryItems.length
            ) * 100;


        viewerProgress.style.width =
            `${progress}%`;


        /*
         * Animate image back in.
         */

        requestAnimationFrame(() => {

            viewerImage.style.transform =
                "translateX(0) scale(1)";

            viewerImage.classList.add(
                "visible"
            );

        });

    }, 220);

}


/* =====================================================
   OPEN VIEWER
===================================================== */

function openViewer(index) {

    currentImage = index;

    viewer.classList.add(
        "active"
    );

    viewer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "viewer-open"
    );

    updateViewer();

}


/* =====================================================
   CLOSE VIEWER
===================================================== */

function closeViewer() {

    viewer.classList.remove(
        "active"
    );

    viewer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "viewer-open"
    );

}


/* =====================================================
   GALLERY CARD CLICKS
===================================================== */

galleryCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                openViewer(index);

            }
        );

    }
);


/* =====================================================
   NEXT
===================================================== */

function nextImage() {

    currentImage++;

    if (
        currentImage >=
        galleryItems.length
    ) {

        currentImage = 0;

    }

    updateViewer(1);

}


/* =====================================================
   PREVIOUS
===================================================== */

function previousImage() {

    currentImage--;

    if (currentImage < 0) {

        currentImage =
            galleryItems.length - 1;

    }

    updateViewer(-1);

}


/* =====================================================
   VIEWER BUTTONS
===================================================== */

viewerNext.addEventListener(
    "click",
    nextImage
);

viewerPrevious.addEventListener(
    "click",
    previousImage
);

viewerClose.addEventListener(
    "click",
    closeViewer
);


/* =====================================================
   VIEWER BACKGROUND CLICK
===================================================== */

viewer.addEventListener(
    "click",
    event => {

        if (
            event.target === viewer ||
            event.target ===
            document.querySelector(
                ".viewer-bg"
            )
        ) {

            closeViewer();

        }

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !viewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeViewer();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }

    }
);


/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


viewer.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


viewer.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0]
                .screenX;

        const distance =
            touchEndX - touchStartX;


        if (
            Math.abs(distance) < 50
        ) {

            return;

        }


        if (distance < 0) {

            nextImage();

        } else {

            previousImage();

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   PRELOAD GALLERY IMAGES
===================================================== */

galleryItems.forEach(item => {

    const image =
        new Image();

    image.src =
        item.image;

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".overview-content, " +
        ".large-image-frame, " +
        ".gallery-intro, " +
        ".gallery-card, " +
        ".angles-heading, " +
        ".angles-view, " +
        ".exploded-copy, " +
        ".exploded-image, " +
        ".unboxing-heading, " +
        ".unboxing-video, " +
        ".details-heading, " +
        ".spec-row, " +
        ".final-copy"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal"
    );

    revealObserver.observe(
        element
    );

});


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });