function comprobarSesion(){
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    if(tipoUsuario !== null){
        const redirecciones = {
            'usuario': '../src/usuarios/inicio.php',
            'rider': '../src/riders/inicio.html',
            'proveedor': '../src/proveedores/inicio.html',
            'administrador': '../src/administrador/inicio.html'
        }
        return window.location.href = redirecciones[tipoUsuario];
    }else{
        return true;
    }
}

comprobarSesion();