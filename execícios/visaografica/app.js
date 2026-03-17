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
let i = 0;
let estampas = document.querySelectorAll(".estampa");

function trocarEstampa(){

estampas.forEach(img => img.style.display = "none");

i++;

if(i > estampas.length){
i = 1;
}

estampas[i-1].style.display = "block";

setTimeout(trocarEstampa, 5000);

}

trocarEstampa();
