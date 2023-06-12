const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

if(localStorage.getItem("tipoUsuario") !== undefined && localStorage.getItem("tipoUsuario") == "proveedor"){
    try {
        const imgPerfil = document.getElementById("imgPerfil");
        const sesionCif = localStorage.getItem("cif");
        imgPerfil.style.backgroundImage = `url('../../img_bbdd/proveedores/${sesionCif}.jpg')`;
        imgPerfil.style.backgroundSize = "cover";
        imgPerfil.style.backgroundPosition = "center";
    } catch (e) {
        console.log("Sin imagen de perfil en navbar");
    }
}