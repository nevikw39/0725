$("#btnPassword").click(() => {
    let data = new URLSearchParams();
    data.append("pwd", $("#inputPassword").val());
    fetch("login", { method: "post", body: data, credentials: 'include' }).then(r => {
        switch (r.status) {
            case 200:
                window.location.href = "success";
                break;
            case 403:
            case 401:
                $("#inputPassword").addClass("is-invalid");
                break;
        }
    }).catch(e => console.log(e))
});