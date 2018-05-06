document.addEventListener("DOMContentLoaded", function () {

    // Copyright Date

    var date = new Date();
    document.getElementById("year").innerHTML = date.getFullYear();

    // Scroll

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                alignToTop: false,
                behavior: "smooth",
                block: "start",
                inline: "start"
            });
        });
    });




});