let easings = [
    'easeInQuad',
    'easeInCubic',
    'easeInQuart',
    'easeInQuint',
    'easeInSine',
    'easeInExpo',
    'easeInCirc',
    'easeInBack',
    'easeInBounce',
    'easeInOutQuad',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInOutSine',
    'easeInOutExpo',
    'easeInOutCirc',
    'easeInOutBack',
    'easeInOutBounce',
    'easeOutQuad',
    'easeOutCubic',
    'easeOutQuart',
    'easeOutQuint',
    'easeOutSine',
    'easeOutExpo',
    'easeOutCirc',
    'easeOutBack',
    'easeOutBounce'
];
anime.timeline({ loop: true })
    .add({
        targets: '#title',
        opacity: [0, 1],
        scale: [0.2, 1],
        duration: 800
    }).add({
        targets: '#title',
        opacity: 0,
        scale: 3,
        duration: 600,
        easing: "easeInExpo",
        delay: 500
    }).add({
        targets: '#title',
        opacity: 0,
        duration: 500,
        delay: 500
    });
let animeBtn = anime({
    targets: '#btnPassword',
    easing: easings[Math.floor(Math.random() * easings.length)],
    duration: 200,
    translateY: [5, 0, -5, 0],
    rotate: [5, 0, -5, 0],
    direction: 'alternate',
    loop: true,
    autoplay: false
});
anime({
    targets: "#img",
    easing: easings[Math.floor(Math.random() * easings.length)],
    rotateY: [90, 0, -90, 0],
    duration: 2500,
    loop: true
});
$("#btnPassword").hover(() => animeBtn.play(), () => animeBtn.pause())
$("#btnPassword").click(() => {
    let data = new URLSearchParams();
    data.append("pwd", $("#inputPassword").val());
    fetch(".", { method: "post", body: data, credentials: 'include' }).then(r => {
        switch (r.status) {
            case 403:
                $("#modal").modal("show")
            case 401:
                $("#inputPassword").addClass("is-invalid");
                anime({
                    targets: '#form',
                    easing: easings[Math.floor(Math.random() * easings.length)],
                    duration: 100,
                    translateX: [50, 0, -50, 0],
                    loop: 10
                });
                break;
            case 200:
                window.location.reload();
        }
    }).catch(e => console.log(e))
});