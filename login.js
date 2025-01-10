function loguear() {
    
    let user = document.getElementById("input1").value;
    let clave = document.getElementById("input2").value;
    
    if (user === "106424" && clave === "106424") {
        window.location = "registro.html";
    } else {
        alert("Datos incorrectos");
    }
}
