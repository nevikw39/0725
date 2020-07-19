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
$("#time").hide();
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
function failed(sec) {
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
    setTimeout(() => {
        $("#btnPassword").attr("disabled", false);
        animeBtnLocked.pause();
    }, sec * 1000);
    anime({
        targets: "#time",
        innerHTML: [sec, 0],
        easing: 'linear',
        round: 100,
        duration: sec * 1000
    });
}
let n = Number(localStorage.getItem("nevikw39_0725"));
if (n && n > Date.now() * 10 ** 6)
    failed(Math.round((n - Date.now() * 10 ** 6) / 10 ** 9))
$("#btnPassword").hover(() => animeBtn.play(), () => animeBtn.pause())
$("#form").submit(() => {
    let data = new FormData(document.getElementById("form"));
    fetch(".", { method: "post", body: data, credentials: 'include' }).then(r => {
        switch (r.status) {
            case 403:
                $("#modal").modal("show")
            case 429:
            case 401:
                if (r.status == 429)
                    alert("還想偷雞啊 ㄏㄏ");
                r.json().then(j => {
                    localStorage.setItem("nevikw39_0725", j.nevikw39_0725);
                    failed(Math.round((j.nevikw39_0725 - Date.now() * 10 ** 6) / 10 ** 9))
                });
                break;
            case 200:
                location.reload();
        }
    }).catch(e => console.log(e));
    return false;
});