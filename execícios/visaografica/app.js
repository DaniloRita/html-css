document.addEventListener("DOMContentLoaded", function() {

    // =========================
    // MENU
    // =========================
    window.abrirmenu = function(){
        let menu = document.getElementById("menu");
        let fundo = document.getElementById("fundo");
        let whatsapp = document.getElementById("whatsapp");

        menu.classList.add("ativo");
        fundo.style.display = "block";
        whatsapp.style.display = "none";
        whatsapp.style.opacity = "0";
    }

    window.fecharMenu = function(){
        let menu = document.getElementById("menu");
        let fundo = document.getElementById("fundo");
        let whatsapp = document.getElementById("whatsapp");

        menu.classList.remove("ativo");
        fundo.style.display = "none";
        whatsapp.style.display = "block";
        whatsapp.style.opacity = "1";
    }

    // =========================
    // SLIDER
    // =========================
    function iniciarSlider(classe) {
        let imagens = document.querySelectorAll(classe);

        if (imagens.length === 0) return;

        let i = 0;

        function trocar() {
            imagens.forEach(img => img.style.display = "none");

            i++;
            if (i > imagens.length) i = 1;

            imagens[i - 1].style.display = "block";

            setTimeout(trocar, 5000);
        }

        trocar();
    }

    iniciarSlider(".estampa");
    iniciarSlider(".Encardena");

    // =========================
    // ORDENAR LISTAS
    // =========================
    document.querySelectorAll(".lista-preco").forEach(lista => {
        let itens = Array.from(lista.querySelectorAll("li"));

        itens = itens.filter(item => {
            let span = item.querySelector("span");
            return span && span.innerText.trim() !== "";
        });

        itens.sort((a, b) => {
            let textoA = a.querySelector("span").innerText.trim().toLowerCase();
            let textoB = b.querySelector("span").innerText.trim().toLowerCase();

            return textoA.localeCompare(textoB, 'pt', { sensitivity: 'base' });
        });

        lista.innerHTML = "";
        itens.forEach(item => lista.appendChild(item));
    });

    // =========================
    // LIGHTBOX (IMAGENS)
    // =========================
    let lightbox = document.getElementById("lightbox");
    let imgGrande = document.getElementById("imgGrande");
    let fechar = document.getElementById("fechar");
    let whatsapp = document.getElementById("whatsapp");

    document.querySelectorAll(".card img, #galeria img").forEach(img => {
        img.addEventListener("click", function(e){
            e.stopPropagation();

            imgGrande.src = this.src;
            lightbox.style.display = "flex";

            whatsapp.style.display = "none";
        });
    });

    fechar.addEventListener("click", function(e){
        e.stopPropagation();

        lightbox.style.display = "none";
        whatsapp.style.display = "block";
    });

    lightbox.addEventListener("click", function(){
        lightbox.style.display = "none";
        whatsapp.style.display = "block";
    });

    imgGrande.addEventListener("click", function(e){
        e.stopPropagation();
    });

});


// =========================
// PESQUISA (FORA DO DOMContentLoaded)
// =========================
document.getElementById("pesquisa").addEventListener("keyup", function() {

    let valor = this.value.toLowerCase();

    document.querySelectorAll(".lista-preco").forEach(lista => {
        let itens = lista.querySelectorAll("li");
        let temResultado = false;

        itens.forEach(item => {
            let nome = item.querySelector("span")?.innerText.toLowerCase() || "";
            let preco = item.querySelector("strong")?.innerText.toLowerCase() || "";

            if(nome.includes(valor) || preco.includes(valor)){
                item.style.display = "flex";
                temResultado = true;
            } else {
                item.style.display = "none";
            }
        });

        let titulo = lista.previousElementSibling;

        if(temResultado){
            lista.style.display = "block";
            if(titulo) titulo.style.display = "block";
        } else {
            lista.style.display = "none";
            if(titulo) titulo.style.display = "none";
        }
    });

    // esconder footer
    let footer = document.querySelector("footer");

    if(valor !== ""){
        footer.style.display = "none";
    } else {
        footer.style.display = "block";
    }

});
