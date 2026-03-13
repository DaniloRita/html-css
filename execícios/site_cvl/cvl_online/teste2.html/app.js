const PIN_ADMIN = "1234";

let produtos = [
    {
        categoria:"calcados",
        nome:"Sapato Nike",
        preco:3500,
        imagens:[],
        vendedor:"Loja Daniritmo",
        contacto:"989000000",
        morada:"São Tomé",
        avaliacao:0,
        comentarios:[]
    }
];

let produtoAtual = null;
let acessoRestrito = false;

/* ---------------- INICIO ---------------- */

document.addEventListener("DOMContentLoaded", ()=>{

    iniciarApp();
    mostrarProdutos(produtos);

    document.getElementById("campoPesquisa").addEventListener("input", pesquisar);

    let tema = localStorage.getItem("tema");
    if(tema){
        document.querySelector("header").style.backgroundImage = tema;
        document.getElementById("menu").style.backgroundImage = tema;
    }
});

/* ---------------- CONTA ---------------- */

function criarConta(){

    let tipo = tipoConta.value;
    let nome = cadNome.value.trim();
    let tel  = cadTelefone.value.trim();

    if(!nome || !tel){
        alert("Preencha nome e telefone");
        return;
    }

    localStorage.setItem("conta",JSON.stringify({
        tipo,nome,telefone:tel
    }));

    iniciarApp();
}

function iniciarApp(){

    let conta = localStorage.getItem("conta");

    if(!conta){
        mostrarSomente("telaCadastro");
    }else{
        mostrarSomente("home");
    }
}

/* ---------------- NAVEGAÇÃO ---------------- */

function abrirTela(tela){

    let conta = JSON.parse(localStorage.getItem("conta"));

    if(tela=="publicar" && conta.tipo!="vendedor"){
        alert("Apenas vendedores podem publicar.");
        return;
    }

    mostrarSomente(
        tela=="home" ? "home" :
        "tela"+tela.charAt(0).toUpperCase()+tela.slice(1)
    );
}

function mostrarSomente(tela){

    let telas = ["telaCadastro","telaPublicar","telaPerfil","telaDefinicoes","telaProduto"];

    telas.forEach(t=>{
        let el = document.getElementById(t);
        if(el) el.style.display="none";
    });

    produtosSection(false);

    if(tela=="home"){
        produtosSection(true);
    }else{
        let el = document.getElementById(tela);
        if(el) el.style.display="block";
    }
}

function produtosSection(mostrar){
    produtos.style.display = mostrar?"block":"none";
    categorias.style.display = mostrar?"flex":"none";
    pesquisa.style.display = mostrar?"block":"none";
}

/* ---------------- PRODUTOS ---------------- */

function mostrarProdutos(lista){

    listaProdutos.innerHTML="";

    lista.forEach(p=>{

        listaProdutos.innerHTML+=`
        <div onclick="abrirProduto('${p.nome}')">
            <h4>${p.nome}</h4>
            <p>${p.preco} Dbs</p>
            <small>${p.vendedor}</small>
        </div>`;
    });
}

function abrirCategoria(cat){
    mostrarProdutos(produtos.filter(p=>p.categoria==cat));
}

function abrirProduto(nome){

    produtoAtual = produtos.find(p=>p.nome==nome);

    mostrarSomente("telaProduto");

    detalheNome.innerText = produtoAtual.nome;
    detalhePreco.innerText = produtoAtual.preco+" Dbs";

    mostrarGaleria();
    mostrarAvaliacao();
    mostrarInfoVendedor();
    mostrarComentarios();
}

function mostrarGaleria(){

    galeria.innerHTML="";

    produtoAtual.imagens.forEach(i=>{
        galeria.innerHTML+=`<img src="${i}" style="width:80px">`;
    });
}

function publicarProduto(){

    let conta = JSON.parse(localStorage.getItem("conta"));

    let f1 = img1.files[0];
    if(!nomeProduto.value || !precoProduto.value || !f1){
        alert("Preencha tudo");
        return;
    }

    let novo = {
        categoria:categoriaProduto.value,
        nome:nomeProduto.value,
        preco:precoProduto.value,
        imagens:[URL.createObjectURL(f1)],
        vendedor:conta.nome,
        contacto:"",
        morada:"",
        avaliacao:0,
        comentarios:[]
    };

    produtos.push(novo);

    alert("Publicado");

    abrirTela("home");
    mostrarProdutos(produtos);
}

function voltar(){
    abrirTela("home");
}

/* ---------------- PESQUISA ---------------- */

function pesquisar(){

    let t = campoPesquisa.value.toLowerCase().trim();

    let r = produtos.filter(p=>
        p.nome.toLowerCase().includes(t) ||
        p.vendedor.toLowerCase().includes(t) ||
        ( (t=="sapato"||t=="sapatos") && p.categoria=="calcados")
    );

    mostrarProdutos(r);
}

/* ---------------- AVALIAÇÃO ---------------- */

function mostrarAvaliacao(){

    areaAvaliacao.innerHTML="Avaliação:<br>";

    for(let i=1;i<=5;i++){

        let e = i<=produtoAtual.avaliacao?"★":"☆";

        areaAvaliacao.innerHTML+=
        `<span onclick="avaliar(${i})" style="font-size:22px">${e}</span>`;
    }
}

function avaliar(v){
    produtoAtual.avaliacao=v;
    mostrarAvaliacao();
}

/* ---------------- COMENTÁRIOS ---------------- */

function mostrarComentarios(){

    listaComentarios.innerHTML="";

    produtoAtual.comentarios.forEach(c=>{
        listaComentarios.innerHTML+=`<p>• ${c}</p>`;
    });
}

function enviarComentario(){

    if(!novoComentario.value) return;

    produtoAtual.comentarios.push(novoComentario.value);
    novoComentario.value="";
    mostrarComentarios();
}

/* ---------------- VENDEDOR ---------------- */

function mostrarInfoVendedor(){

    infoVendedor.innerHTML=
    `<b>Vendedor:</b> ${produtoAtual.vendedor}<br>
     <b>Contacto:</b> ${produtoAtual.contacto}<br>
     <b>Morada:</b> ${produtoAtual.morada}`;
}

/* ---------------- PERFIL ---------------- */

function guardarPerfil(){

    let dados = {
        nome:nomePerfil.value,
        tel:telefonePerfil.value,
        loc:localizacaoPerfil.value,
        foto:null
    };

    if(fotoPerfil.files[0]){
        dados.foto = URL.createObjectURL(fotoPerfil.files[0]);
    }

    localStorage.setItem("perfil",JSON.stringify(dados));
    mostrarPerfil();
}

function mostrarPerfil(){

    let d = JSON.parse(localStorage.getItem("perfil"));
    if(!d) return;

    nomePerfil.value=d.nome||"";
    telefonePerfil.value=d.tel||"";
    localizacaoPerfil.value=d.loc||"";

    if(d.foto){
        previewPerfil.src=d.foto;
        previewPerfil.style.display="block";
    }
}

/* ---------------- ENTRADA RESTRITA ---------------- */

let pedidos=[
    {nome:"Loja A",telefone:"991111"},
    {nome:"Loja B",telefone:"992222"}
];

function abrirEntradaRestrita(){

    if(!acessoRestrito){

        let p = prompt("PIN administrador");

        if(p!=PIN_ADMIN){
            alert("PIN errado");
            return;
        }

        acessoRestrito=true;
    }

    areaRestrita.style.display="block";
    mostrarPedidos();
}

function mostrarPedidos(){

    listaPedidos.innerHTML="";

    pedidos.forEach((p,i)=>{

        listaPedidos.innerHTML+=`
        <div>
            <b>${p.nome}</b><br>${p.telefone}<br>
            <button onclick="aceitar(${i})">Aceitar</button>
            <button onclick="recusar(${i})">Recusar</button>
        </div>`;
    });
}

function aceitar(i){
    pedidos.splice(i,1);
    mostrarPedidos();
}

function recusar(i){
    pedidos.splice(i,1);
    mostrarPedidos();
}

/* ---------------- TEMA ---------------- */

function aplicarTema(t){

    header.style.backgroundImage=t;
    menu.style.backgroundImage=t;

    localStorage.setItem("tema",t);
}

function temaVerde(){
    aplicarTema("linear-gradient(360deg,rgb(4,65,4),rgb(12,122,12),rgb(25,220,25))");
}
function temaAzul(){
    aplicarTema("linear-gradient(360deg,rgb(5,30,90),rgb(20,80,200),rgb(60,150,255))");
}
function temaVermelho(){
    aplicarTema("linear-gradient(360deg,rgb(90,5,5),rgb(180,30,30),rgb(255,70,70))");
}
