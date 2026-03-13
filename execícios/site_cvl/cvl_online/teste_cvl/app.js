function calcularIdade(data){
    let hoje = new Date();
    let nasc = new Date(data);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    let m = hoje.getMonth() - nasc.getMonth();
    if(m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())){
        idade--;
    }
    return idade;
}

/* ---------- TELAS ---------- */

function mostrarSomente(tela){

    let telas = [
        "telaLogin",
        "telaCadastro",
        "telaPublicar",
        "telaPerfil",
        "telaDefinicoes",
        "telaProduto",
        "telaRecuperar"
    ];

    telas.forEach(id=>{
        let el = document.getElementById(id);
        if(el) el.style.display="none";
    });

    if(tela == "home"){
        document.getElementById("produtos").style.display="block";
        document.getElementById("categorias").style.display="flex";
        document.getElementById("pesquisa").style.display="block";
    }else{
        document.getElementById("produtos").style.display="none";
        document.getElementById("categorias").style.display="none";
        document.getElementById("pesquisa").style.display="none";

        let t = document.getElementById(tela);
        if(t) t.style.display="block";
    }
}

/* ---------- APP ---------- */

function iniciarApp(){

    let id = localStorage.getItem("usuarioLogado");

    if(!id){
        mostrarSomente("telaLogin");
        document.getElementById("topo").style.display="none";
        document.getElementById("menu").style.display="none";
        return;
    }

    document.getElementById("topo").style.display="block";
    document.getElementById("menu").style.display="flex";

    mostrarSomente("home");
}

/* ---------- CADASTRO ---------- */

function criarConta(){

    let tipo  = document.getElementById("tipoConta").value;
    let nome  = document.getElementById("cadNome").value.trim();
    let tel   = document.getElementById("cadTelefone").value.trim();
    let nasc  = document.getElementById("cadNascimento").value;
    let foto  = document.getElementById("cadFoto").files[0];

    let local = document.getElementById("cadLocalizacao") ?
                document.getElementById("cadLocalizacao").value.trim() : "";

    let sexo  = document.querySelector("input[name='cadSexo']:checked")?.value || "";

    if(!nome || !tel || !nasc){
        alert("Preencha todos os dados");
        return;
    }

    let idade = calcularIdade(nasc);

    if(tipo == "vendedor" && idade < 18){
        alert("Vendedor deve ter 18 anos ou mais");
        return;
    }

    if(tipo == "cliente" && idade < 11){
        alert("Cliente deve ter 11 anos ou mais");
        return;
    }

    let contas = JSON.parse(localStorage.getItem("contas") || "[]");

    if(contas.find(c => c.telefone == tel)){
        alert("Já existe conta com este número");
        return;
    }

    let nova = {
        id: Date.now(),
        tipo: tipo,
        nome: nome,
        telefone: tel,
        nascimento: nasc,
        localizacao: tipo=="vendedor" ? local : "",
        sexo: tipo=="vendedor" ? sexo : "",
        foto: foto ? URL.createObjectURL(foto) : "",
        seguidores: []
    };

contas.push(nova);
localStorage.setItem("contas", JSON.stringify(contas));
localStorage.setItem("usuarioLogado", nova.id);

iniciarApp();
abrirTela("home");

}

/* ---------- LOGIN ---------- */

function entrar(){

    let tel = document.getElementById("loginTelefone").value.trim();

    if(!tel){
        alert("Digite o número");
        return;
    }

    let contas = JSON.parse(localStorage.getItem("contas") || "[]");

    let conta = contas.find(c => c.telefone == tel);

    if(!conta){
        alert("Conta não encontrada");
        return;
    }

    localStorage.setItem("usuarioLogado", conta.id);

    iniciarApp();
}

/* ---------- RECUPERAÇÃO ---------- */

function abrirRecuperacao(){
    mostrarSomente("telaRecuperar");
}

function recuperarConta(){

    let tel = document.getElementById("recTel").value.trim();

    let contas = JSON.parse(localStorage.getItem("contas") || "[]");

    let conta = contas.find(c => c.telefone == tel);

    if(!conta){
        alert("Conta não encontrada");
        return;
    }

    alert("Conta encontrada. Agora você pode entrar com o número.");
    mostrarSomente("telaLogin");
}

/* ---------- TELAS AUXILIARES ---------- */

function abrirCadastro(){
    mostrarSomente("telaCadastro");
}

function voltarLogin(){
    mostrarSomente("telaLogin");
}

/* ---------- PERFIL ---------- */

function mostrarPerfilPublico(){

    let id = localStorage.getItem("usuarioLogado");
    let contas = JSON.parse(localStorage.getItem("contas") || "[]");

    let u = contas.find(c => c.id == id);

    if(!u) return;

    mostrarSomente("telaPerfil");

    let html = `
        <img src="${u.foto}" style="width:90px;height:90px;border-radius:50%;object-fit:cover"><br><br>
        <b>${u.nome}</b><br>
    `;

    if(u.tipo == "vendedor"){
        html += `
            ${u.telefone}<br>
            ${u.localizacao}<br>
        `;
    }

    document.getElementById("telaPerfil").innerHTML = html;
}

/* ---------- EVENTO DO SELECT ---------- */

document.getElementById("tipoConta").addEventListener("change", function(){

    let area = document.getElementById("areaVendedor");

    if(!area) return;

    area.style.display = this.value == "vendedor" ? "block" : "none";
});

/* ---------- INICIAR ---------- */

window.addEventListener("load", iniciarApp);
let categorias = null;
let autoScroll = null;
let usuarioInteragiu = false;
let tempo = null;

function iniciarAutoScrollCategorias(){

    if(!categorias) return;

    if(autoScroll) clearInterval(autoScroll);

    autoScroll = setInterval(()=>{

        if(usuarioInteragiu) return;

        categorias.scrollLeft += 120;

        if(
            categorias.scrollLeft + categorias.clientWidth
            >= categorias.scrollWidth - 5
        ){
            categorias.scrollLeft = 0;
        }

    },2000);
}

function pararAutoScroll(){
    usuarioInteragiu = true;

    if(autoScroll){
        clearInterval(autoScroll);
        autoScroll = null;
    }
}

window.addEventListener("load", ()=>{

    categorias = document.getElementById("categorias");
    if(!categorias) return;

    ["touchstart","mousedown","wheel","pointerdown"].forEach(evt=>{
        categorias.addEventListener(evt, pararAutoScroll, {passive:true});
    });

    categorias.addEventListener("scroll",()=>{

        usuarioInteragiu = true;

        clearTimeout(tempo);

        tempo = setTimeout(()=>{
            usuarioInteragiu = false;
            iniciarAutoScrollCategorias(); // ← volta a rolar sozinho
        },5000);

    });

    iniciarAutoScrollCategorias();
});



window.addEventListener("load", iniciarAutoScrollCategorias);
function abrirTela(tela){

    if(tela === "home"){
        mostrarSomente("home");
        return;
    }

    if(tela === "perfil"){
        mostrarPerfilPublico();
        return;
    }

    if(tela === "publicar"){

        let id = Number(localStorage.getItem("usuarioLogado")); // 👈 correção
        let contas = JSON.parse(localStorage.getItem("contas") || "[]");

        let u = contas.find(c => Number(c.id) === id); // 👈 correção

        if(!u){
            alert("Erro ao carregar utilizador.");
            return;
        }

        // só vendedor pode publicar
        if(u.tipo !== "vendedor"){
            alert("Apenas vendedores podem publicar produtos.");
            return;
        }

        mostrarSomente("telaPublicar");
        return;
    }

    if(tela === "definicoes"){
        mostrarSomente("telaDefinicoes");
        return;
    }

}
