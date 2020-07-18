let easings = [
    'easeInOutQuad',
    'easeInOutCubic',
    'easeInOutQuart',
    'easeInOutQuint',
    'easeInOutSine',
    'easeInOutExpo',
    'easeInOutCirc',
    'easeInOutBack',
    'easeInOutBounce'
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
$("#time").hide();
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
                $("#btnPassword").attr("disabled", true);
                animeBtn.pause();
                $("#time").show();
                let animeBtnLocked = anime({
                    targets: '#btnPassword',
                    easing: easings[Math.floor(Math.random() * easings.length)],
                    duration: 350,
                    rotate: [5, 0, -5, 0],
                    direction: 'alternate',
                    loop: true
                });
                let cnt = 60;
                let time = setInterval(() => {
                    if (!cnt--) {
                        clearInterval(time);
                        $("#btnPassword").attr("disabled", false);
                        animeBtnLocked.pause();
                    };
                }, 1000);
                anime({
                    targets: "#time",
                    innerHTML: [60, 0],
                    easing: 'linear',
                    round: 100,
                    duration: 60000
                  });
                break;
            case 200:
                window.location.reload();
        }
    }).catch(e => console.log(e))
});