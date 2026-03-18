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
function iniciarSlider(classe) {
    let i = 0;
    let imagens = document.querySelectorAll(classe);

    function trocar() {
        imagens.forEach(img => img.style.display = "none");

        i++;
        if (i > imagens.length) {
            i = 1;
        }

        imagens[i - 1].style.display = "block";

        setTimeout(trocar, 5000);
    }

    trocar();
}

// iniciar sliders
iniciarSlider(".estampa");
iniciarSlider(".Encardena");

