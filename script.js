/* =========================================================
   EOS R50 — INTERACTION ENGINE
========================================================= */


/* =========================================================
   01 — SMOOTH SCROLL
========================================================= */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================================
   02 — NAVBAR
========================================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   03 — PAGE PROGRESS
========================================================= */

const progressBar =
    document.getElementById("progressBar");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        percentage + "%";

});



/* =========================================================
   04 — ANGLE DATA
========================================================= */

const angleData = {

    FRONT: {
        description:
            "The EOS R50 from the front, highlighting the compact camera body and RF lens."
    },

    SIDE: {
        description:
            "A side perspective revealing the compact ergonomic body and connection layout."
    },

    DISPLAY: {
        description:
            "Explore the rear display and the camera's creator-focused interface."
    },

    LENS: {
        description:
            "A closer look at the RF-S 18–45mm lens system and optical design."
    }

};



/* =========================================================
   05 — ANGLE SELECTOR
========================================================= */

const angleButtons =
    document.querySelectorAll(".angle-button");


const interactiveImage =
    document.getElementById(
        "interactiveImage"
    );


const angleNumber =
    document.getElementById(
        "angleNumber"
    );


const angleDescription =
    document.getElementById(
        "angleDescription"
    );


angleButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const image =
                button.dataset.image;

            const title =
                button.dataset.title;

            const number =
                button.dataset.number;


            /*
             * Fade image out
             */

            interactiveImage.classList.add(
                "changing"
            );


            setTimeout(() => {

                interactiveImage.src =
                    image;

                interactiveImage.alt =
                    "EOS R50 " + title;


                angleNumber.textContent =
                    number;


                angleDescription.textContent =
                    angleData[title].description;


                interactiveImage.classList.remove(
                    "changing"
                );

            }, 250);


            /*
             * Update active button
             */

            angleButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );

        }
    );

});



/* =========================================================
   06 — CAMERA MOUSE PARALLAX
========================================================= */

const cameraStage =
    document.getElementById(
        "interactiveCamera"
    );


const cameraImage =
    document.getElementById(
        "interactiveImage"
    );


if (cameraStage) {

    cameraStage.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                cameraStage.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 5;


            const rotateX =
                ((y - centerY) / centerY) * -4;


            cameraImage.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.035)
            `;

        }
    );


    cameraStage.addEventListener(
        "mouseleave",
        () => {

            cameraImage.style.transform = `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;

        }
    );

}



/* =========================================================
   07 — IMAGE ZOOM
========================================================= */

const zoomButton =
    document.getElementById(
        "zoomButton"
    );


let zoomed = false;


if (zoomButton) {

    zoomButton.addEventListener(
        "click",
        () => {

            zoomed = !zoomed;


            if (zoomed) {

                cameraImage.classList.add(
                    "zoomed"
                );

                zoomButton.textContent =
                    "−";

            } else {

                cameraImage.classList.remove(
                    "zoomed"
                );

                zoomButton.textContent =
                    "+";

            }

        }
    );

}



/* =========================================================
   08 — HERO VIDEO PARALLAX
========================================================= */

const heroVideo =
    document.querySelector(
        ".hero-video"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroVideo) return;


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroVideo.style.transform = `
                scale(1.02)
                translateY(${scroll * 0.08}px)
            `;

        }

    }
);



/* =========================================================
   09 — EXPLODED VIEW PARALLAX
========================================================= */

const explodedContainer =
    document.getElementById(
        "explodedContainer"
    );


const explodedImage =
    document.querySelector(
        ".exploded-image"
    );


if (explodedContainer) {

    explodedContainer.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                explodedContainer
                .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const moveX =
                (x - centerX) * 0.015;


            const moveY =
                (y - centerY) * 0.015;


            explodedImage.style.transform = `
                translate(${moveX}px, ${moveY}px)
                scale(1.02)
            `;

        }
    );


    explodedContainer.addEventListener(
        "mouseleave",
        () => {

            explodedImage.style.transform =
                "translate(0,0) scale(1)";

        }
    );

}



/* =========================================================
   10 — SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   11 — UNBOXING VIDEO AUTOPLAY WHEN VISIBLE
========================================================= */

const unboxingVideo =
    document.getElementById(
        "unboxingVideo"
    );


if (unboxingVideo) {

    const videoObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            /*
                             * Browser may allow
                             * muted autoplay.
                             */

                            unboxingVideo.play()
                                .catch(() => {});

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    videoObserver.observe(
        unboxingVideo
    );

}



/* =========================================================
   12 — HERO VIDEO TIME
========================================================= */

const mainVideo =
    document.getElementById(
        "mainVideo"
    );


const videoTime =
    document.getElementById(
        "videoTime"
    );


if (mainVideo && videoTime) {

    mainVideo.addEventListener(
        "timeupdate",
        () => {

            const current =
                Math.floor(
                    mainVideo.currentTime
                );


            const duration =
                Math.floor(
                    mainVideo.duration || 5
                );


            videoTime.textContent =
                `00:${String(current).padStart(2,"0")}
                / 00:${String(duration).padStart(2,"0")}`;

        }
    );

}



/* =========================================================
   13 — TOUCH SUPPORT
========================================================= */

let touchStartX = 0;


if (cameraStage) {

    cameraStage.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.touches[0].clientX;

        }
    );


    cameraStage.addEventListener(
        "touchend",
        event => {

            const touchEndX =
                event.changedTouches[0].clientX;


            const difference =
                touchEndX - touchStartX;


            if (Math.abs(difference) < 50) {
                return;
            }


            const current =
                [...angleButtons]
                .findIndex(
                    button =>
                        button.classList
                            .contains("active")
                );


            if (difference < 0) {

                const next =
                    Math.min(
                        current + 1,
                        angleButtons.length - 1
                    );

                angleButtons[next].click();

            } else {

                const previous =
                    Math.max(
                        current - 1,
                        0
                    );

                angleButtons[previous].click();

            }

        }
    );

}



/* =========================================================
   14 — PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);