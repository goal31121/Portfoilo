$(document).ready(function () {

    function syncHeaderOverHero() {
        var home = document.querySelector('.home');
        var header = document.querySelector('header');
        if (!home || !header) return;
        var threshold = Math.min(home.offsetHeight * 0.65, 520);
        if (window.scrollY < threshold) {
            header.classList.add('header--hero');
        } else {
            header.classList.remove('header--hero');
        }
    }

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        syncHeaderOverHero();

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href^="#"]').on('click', function (e) {
        const target = $(this).attr('href');
        if (!target || target === "#") return;
        const $el = $(target);
        if ($el.length === 0) return;
        e.preventDefault();
        $('html, body').animate({ scrollTop: $el.offset().top }, 500, 'linear');
    });

    // Contact form: mailto fallback (no API keys / secrets required).
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const to = "everestgreen.03107@gmail.com";
        const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`);
        const body = encodeURIComponent(
            [
                `Name: ${name}`,
                `Email: ${email}`,
                phone ? `Phone: ${phone}` : null,
                "",
                message,
            ].filter(Boolean).join("\n")
        );

        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        form.reset();
    });

    syncHeaderOverHero();

    // <!-- typed js effect starts (inside ready: Typed + ScrollReveal both touch .home) -->
    var typingEl = document.querySelector(".typing-text");
    if (typeof Typed !== "undefined" && typingEl) {
        new Typed(typingEl, {
            strings: [
                "Web3 & smart contracts",
                "AI-driven production workflows",
                "C++ & high-performance backends",
                "AWS & reliable operations",
                "React · Next · Vue fullstack",
            ],
            loop: true,
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 500,
            smartBackspace: true,
        });
    }
    // <!-- typed js effect ends -->
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Daishi Kaito";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("./skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        const view = project?.links?.view || "#";
        const code = project?.links?.code || "#";
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a class="btn" href="${view}" target="_blank" rel="noopener noreferrer">View</a>
            <a class="btn" href="${code}" target="_blank" rel="noopener noreferrer">Code</a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME — use h2 (hero has no h3); skip .content p so Typed.js is not fighting ScrollReveal */
srtop.reveal('.home .content h2', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .socials', { delay: 350 });

srtop.reveal('.home .image', { delay: 400 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });