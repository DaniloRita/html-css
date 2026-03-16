function abrirmenu(){
    let menu= document.getElementById("menu")
     menu.classList.toggle("ativo");
    if(menu.style.display === "none" || menu.style.display === ""){
        menu.style.display = "block";
    }
    else{
        menu.style.display="none"
    }

}
function fecharMenu(){
    let menu= document.getElementById("menu")
    let fundo=document.getElementById("fundo")
    menu.classList.remove("ativo")
    fundo.style.display= "none"
}