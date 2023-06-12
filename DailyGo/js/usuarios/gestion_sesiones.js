function comprobarSesion(){
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    if(tipoUsuario !== "usuario"){
        if(tipoUsuario !== null){
            
            const redirecciones = {
                'proveedor': '../proveedores/inicio.html',
                'rider': '../riders/inicio.html',
                'administrador': '../administrador/inicio.html',
            }

            window.location.href = redirecciones[tipoUsuario];
        }else{
            window.location.href = '../index.html';
        }
    }else{
        return true;
    }
}

comprobarSesion();