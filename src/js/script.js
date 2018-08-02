document.addEventListener("DOMContentLoaded", function () {
    // Copyright Date
    var date = new Date();
    document.getElementById("year").innerHTML = date.getFullYear();
    // Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute(
                'href')).scrollIntoView({
                alignToTop: false,
                behavior: "smooth",
                block: "start",
                inline: "start"
            });
        });
    });
    // Fade in 
    let elements = document.querySelectorAll(
        "header, nav, .image, .about, .work, .contact");
    elements.forEach((elem) => {
        elem.style.opacity = "1";
        elem.style.bottom = "0";
    });
    // Counters 
    let run = true;
    const counterpos = document.getElementById('counters').offsetTop -
        500;
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY || window.scrollTop ||
            document.getElementsByTagName("html")[0].scrollTop;
        if (scrollPos >= counterpos) {
            if (run) {
                counters();
            }
            run = false;
        }
    });

    function counters() {
        const options = {  
            useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
        };
        const html = new CountUp(document.getElementById('htmlCounter'),
            0, 6234, 0, 3, options);
        const sass = new CountUp(document.getElementById('sassCounter'),
            0, 7033, 0, 3, options);
        const js = new CountUp(document.getElementById('jsCounter'), 0,
            5352, 0, 3, options);
        const vue = new CountUp(document.getElementById('vueCounter'),
            0, 1658, 0, 3, options);
        if (!html.error || !sass.error || !js.error) {  
            html.start();
            sass.start();
            js.start();
            vue.start();
        }
    }
}, false);