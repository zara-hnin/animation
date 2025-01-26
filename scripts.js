document.addEventListener("DOMContentLoaded", function () {
    function startLoader() {
        let landingContent = document.getElementById("landing-content-one");
        if (landingContent) {
            landingContent.style.opacity = 1;
            setTimeout(() => {
                const landingArea = document.getElementById("landing-area-one");
                const mainContent = document.getElementById("zrMainContent");

                document.getElementById("titleOne").style.transform = "translateY(-60px)";
                document.getElementById("titleOne").style.transition = "transform 1s ease";

                document.getElementById("titleTwo").style.transform = "translateY(0px)";
                document.getElementById("titleTwo").style.transition = "transform 1.1s ease";

                document.getElementById("pageloadCaculation").style.transform = "translateY(-7vw)";                
                document.getElementById("pageloadCaculation").style.transition = "transform 1s ease";
                setTimeout(()=>{
                    document.getElementById("pageloadCaculation").style.display = "none";
                    document.getElementById("titleOne").style.display = "none";
                },450)


                setTimeout(() => {
                    landingContent.style.transform = 'scale(0.85)';
                    landingContent.style.borderRadius ="12px";
                    landingContent.style.transition = "transform 1s ease";
                }, 1500);

                setTimeout(() => {
                    landingArea.style.transform = 'translateX(-100%)';
                    landingArea.style.opacity = 0;
                    landingArea.style.transition = "transform 1s ease, opacity 1s ease";

                    mainContent.style.opacity = 1;
                    mainContent.style.transform = 'translateX(0)';
                    mainContent.style.transition = "transform 1s ease, opacity 1s ease";
                }, 2000);

            }, 7500); 
        }
    }

    startLoader();


    let element = document.querySelector(".pageloadCaculation .count");
    element && animateCount(element, 100, false);

    function animateCount(element, target, appendPlus) {
        let count = 0;
        const duration = 7000;
        const steps = duration / 10; 
        const increment = target / steps; 
        const decimalPlace = target.toString().split(".").at(-1).length;

        function updateCounter() {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = (target % 1 !== 0 ? count.toFixed(decimalPlace) : Math.round(count)) + (appendPlus ? '+' : '');
        }
        const interval = setInterval(updateCounter, 10);
    }


    const cursor = document.querySelector('.cursor');
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        const particle = document.createElement('div');
        particle.classList.add('cursorParticle');
        particle.style.left = `${e.pageX}px`;
        particle.style.top = `${e.pageY}px`;
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2000);
    })

    document.addEventListener("mouseenter", (e) => {
        if (e.target !== cursor) {
            cursor.style.opacity = 1;
        }
    }, true);

    document.addEventListener("mouseleave", (e) => {
        if (e.target !== cursor) {
            cursor.style.opacity = 0;
        }
    }, true);

    const runningTextContainer = document.querySelector('.zr-running-text');
    for (let i = 0; i < 5; i++) {
        const clone = runningTextContainer.children[i].cloneNode(true);
        runningTextContainer.appendChild(clone);
    }


    let text = document.querySelector(".second-section .text");
    let textString = text.textContent;
    let split = textString.split(" ");
    text.textContent = "";
    for(let i=0; i<split.length; i++){
        text.innerHTML += "<label class='word'>"+split[i]+"</label>";
    }


    let isVisible = false;
    let secondSection = document.querySelector('.second-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (entry.isIntersecting) {
                // isVisible = entry.isIntersecting;
                secondSection.style.transform = "translateY(0px)";
                secondSection.style.opacity = 1;
                secondSection.style.transition = "transform 1s ease, opacity 1s ease";
                console.log('Second section has entered the viewport!', isVisible);
            } else {
                // isVisible = entry.isIntersecting;
                console.log('Second section has exited the viewport!', isVisible);
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    observer.observe(secondSection);


    let isVisibleIntroduction = false;
    let introductionSection = document.querySelector('.zr-introduction');

    const introductionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isVisibleIntroduction = entry.isIntersecting;
            if (entry.isIntersecting) {
                introductionSection.classList.add("invisible");
                console.log("introductionObserver ", introductionObserver)
                introductionSection.style.transform = "translateY(0px)";
                introductionSection.style.opacity = 1;
                introductionSection.style.transition = "transform 1s ease, opacity 1s ease";
            } else {
                introductionSection.classList.remove("invisible");
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    introductionObserver.observe(introductionSection);


    let words = document.querySelectorAll(".second-section .word");
    function scrollTrigger() {
        if (isVisible) {
            secondSection.style.transform = "translateY(0px)";
            secondSection.style.opacity = 1;
            secondSection.style.transition = "transform 1s ease, opacity 1s ease";
            let value = window.scrollY;
            let tempVal = parseFloat(value) - parseFloat(secondSection.offsetHeight);
            words.forEach((word, index) => {
                word.classList.add("active"+index);
                word.style.transform = `translate(${(tempVal/((index+1)*10))}px, ${(tempVal/((index+1)*30))}px)`;
                word.style.opacity = 1;
                word.style.transition = "transform 1s ease, opacity 1s ease";
            })

        } else if(isVisibleIntroduction) {
            introductionSection.style.transform = "translateY(0px)";
            introductionSection.style.opacity = 1;
            introductionSection.style.transition = "transform 1s ease, opacity 1s ease";
        }
        else {
            introductionSection.style.transform = "translateY(100px)";
            introductionSection.style.opacity = 0;
            introductionSection.style.transition = "transform 1s ease, opacity 1s ease";

            secondSection.style.transform = "translateY(100px)";
            secondSection.style.opacity = 0;
            secondSection.style.transition = "transform 1s ease, opacity 1s ease";

            words.forEach(word => {
                word.classList.remove("active");
            })
        }
        // let value = window.scrollY;
        // let summaryText = document.querySelector(".zr-introduction .summaryText");
        // summaryText.style.transform = `translateY(${value*0.25}px)`;
        // summaryText.style.opacity = 0;
        // summaryText.style.transition = "transform 1s ease, opacity 1s ease";
    }
    window.addEventListener('scroll', scrollTrigger)

    
});

