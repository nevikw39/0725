$(function () {
    let controller = new ScrollMagic.Controller();
    let wipeAnimation = new TimelineMax()
        .fromTo("section.bg-success", 1, { x: "-100%" }, { x: "0%", ease: Linear.easeNone })
        .fromTo("section.bg-warning", 1, { y: "100%" }, { y: "0%", ease: Linear.easeNone })
        .fromTo("section.bg-danger", 1, { x: "100%" }, { x: "0%", ease: Linear.easeNone });
    new ScrollMagic.Scene({
        triggerElement: "#pin",
        triggerHook: "onLeave",
        duration: "300%"
    }).setPin("#pin")
        .setTween(wipeAnimation)
        .addTo(controller);
});
var textWrapper = document.querySelector('#cong');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({ loop: true })
    .add({
        targets: '#cong',
        translateY: "600%",
        scale: 3,
        duration: 600,
        easing: "easeInExpo",
    })
    .add({
        targets: '#cong .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1) - 50
    }).add({
        targets: '#cong',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });