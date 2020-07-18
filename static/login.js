$("#btnPassword").click(() => {
    let data = new URLSearchParams();
    data.append("pwd", $("#inputPassword").val());
    fetch(".", { method: "post", body: data, credentials: 'include' }).then(r => {
        switch (r.status) {
            case 403:
                $("#modal").modal("show")
            case 401:
                $("#inputPassword").addClass("is-invalid");
                break;
            case 200:
                window.location.reload();
        }
    }).catch(e => console.log(e))
});