$("#inputPassword").click(() => {
    let data = new URLSearchParams();
    data.append("pwd", $("inputPassword").val());
    fetch("login", { method: "post", body: data }).then(() => window.location.href = "success").catch(e => {
        console.log(e);
    })
});