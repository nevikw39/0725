$(function () {
    $(".toast").toast("show");
    let controller = new ScrollMagic.Controller();
    let wipeAnimation = new TimelineMax()
        .fromTo("section.bg-success", 5, { x: "-100%" }, { x: "0%", ease: Circ.easeInOut })
        .fromTo("section.bg-warning", 3, { y: "100%" }, { y: "0%", ease: Bounce.easeInOut })
        .fromTo("section.bg-danger", 5, { x: "100%" }, { x: "0%", ease: Expo.easeInOut })
        // .fromTo("#trigger1", 1, { y: "1%" }, { y: "0%", ease: Quint.easeInOut });
    new ScrollMagic.Scene({
        triggerElement: "#pin",
        triggerHook: "onLeave",
        duration: "1450%"
    })
        .setPin("#pin")
        .setTween(wipeAnimation)
        .addIndicators()
        .addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: "#trigger0"
    })
        .setTween("#cong", 2, { rotate: 90, scale: 2 })
        .on("enter leave", e => {
            if (e.type == "enter") {
                if (launch_id && loop_id) {
                    clearInterval(launch_id);
                    clearInterval(loop_id);
                }
            } else {
                launch_id = setInterval(launch, 800);
                loop_id = setInterval(loop, 1000 / 50);
            }
        })
        .addTo(controller);
    let cardAnimation = new TimelineMax()
        .fromTo("div.card", 2.5, { rotation: -60, x: "-50%", scale: 0.25 }, { rotation: 0, x: "0%", scale: 1, ease: Quint.easeInOut })
    new ScrollMagic.Scene({
        triggerElement: "#trigger1"
    })
        .setTween(cardAnimation)
        .addTo(controller);
    //     let t2 = new TimelineMax()
    //         .fromTo("section.bg-info > h1", 3, { scale: 0 }, { scale: 1 })
    //     new ScrollMagic.Scene({
    //         triggerElement: "#trigger2",
    //         offset: 115
    //     })
    //         .setTween(t2)
    //         .on("enter leave", e => console.debug(e))
    //         .addIndicators("t2")
    //         .addTo(controller);
    //     let t3 = new TimelineMax()
    //         .fromTo("section.bg-info > h1", 3, { scale: 1 }, { scale: 0 })
    //         .fromTo("section.bg-success > h1", 3, { opacity: 0 }, { opacity: 1 })
    //     new ScrollMagic.Scene({
    //         triggerElement: "#trigger3",
    //         offset: 115*3
    //     })
    //         .setTween(t3)
    //         .on("enter leave", e => console.debug(e))
    //         .addIndicators("t3")
    //         .addTo(controller);
});

var textWrapper = document.querySelector('#cong');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline({ loop: true })
    .add({
        targets: '#cong .letter',
        opacity: [0.25, 1],
        easing: "easeInOutQuad",
        duration: 2350,
        delay: (el, i) => 150 * i
    }).add({
        targets: '#cong .letter',
        opacity: [1, 0.25],
        duration: 1250,
        easing: "easeInOutCubic",
        delay: (el, i) => 150 * i
    });
anime.timeline({ loop: true })
    .add({
        targets: '#end .word',
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i
    }).add({
        targets: '#end',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

let SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    mousePos = {
        x: 400,
        y: 300
    },
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    rockets = [],
    MAX_PARTICLES = 400,
    colorCode = 0,
    launch_id,
    loop_id;
$(document).ready(function () {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    launch_id = setInterval(launch, 800);
    loop_id = setInterval(loop, 1000 / 50);
});
$(document).mousemove(function (e) {
    e.preventDefault();
    mousePos = {
        x: e.clientX,
        y: e.clientY
    };
});
$(document).mousedown(function (e) {
    for (var i = 0; i < 5; i++) {
        launchFrom(Math.random() * SCREEN_WIDTH * 2 / 3 + SCREEN_WIDTH / 6);
    }
});
function launch() {
    launchFrom(mousePos.x);
}
function launchFrom(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 6 - 3;
        rocket.size = 8;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        rockets.push(rocket);
    }
}
function loop() {
    if (SCREEN_WIDTH != window.innerWidth) {
        canvas.width = SCREEN_WIDTH = window.innerWidth;
    }
    if (SCREEN_HEIGHT != window.innerHeight) {
        canvas.height = SCREEN_HEIGHT = window.innerHeight;
    }
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    var existingRockets = [];
    for (var i = 0; i < rockets.length; i++) {
        rockets[i].update();
        rockets[i].render(context);
        var distance = Math.sqrt(Math.pow(mousePos.x - rockets[i].pos.x, 2) + Math.pow(mousePos.y - rockets[i].pos.y, 2));
        var randomChance = rockets[i].pos.y < (SCREEN_HEIGHT * 2 / 3) ? (Math.random() * 100 <= 1) : false;
        if (rockets[i].pos.y < SCREEN_HEIGHT / 5 || rockets[i].vel.y >= 0 || distance < 50 || randomChance) {
            rockets[i].explode();
        } else {
            existingRockets.push(rockets[i]);
        }
    }
    rockets = existingRockets;
    var existingParticles = [];
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }
    particles = existingParticles;
    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
}
function Particle(pos) {
    this.pos = {
        x: pos ? pos.x : 0,
        y: pos ? pos.y : 0
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;
    this.resistance = 1;
    this.gravity = 0;
    this.flick = false;
    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
}
Particle.prototype.update = function () {
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;
    this.vel.y += this.gravity;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.size *= this.shrink;
    this.alpha -= this.fade;
};
Particle.prototype.render = function (c) {
    if (!this.exists()) {
        return;
    }
    c.save();
    c.globalCompositeOperation = 'lighter';
    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;
    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
    c.fillStyle = gradient;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.restore();
};
Particle.prototype.exists = function () {
    return this.alpha >= 0.1 && this.size >= 1;
};
function Rocket(x) {
    Particle.apply(this, [{
        x: x,
        y: SCREEN_HEIGHT
    }]);
    this.explosionColor = 0;
}
Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;
Rocket.prototype.explode = function () {
    var count = Math.random() * 10 + 80;
    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;
        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;
        particle.size = 5;
        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = Math.random() * 0.05 + 0.93;
        particle.flick = true;
        particle.color = this.explosionColor;
        particles.push(particle);
    }
};
Rocket.prototype.render = function (c) {
    if (!this.exists()) {
        return;
    }
    c.save();
    c.globalCompositeOperation = 'lighter';
    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;
    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");
    c.fillStyle = gradient;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size / 2 + this.size / 2 : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.restore();
};