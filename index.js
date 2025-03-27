function adicionar() {
    const inputNome = document.getElementById("nome");
    const inputCategoria = document.getElementById("categoria");
    const inputReceita = document.getElementById("receita");
    const img = document.getElementById("img");
    const pessoa = "Formiguinhas"
    const minhaReceita = true;

    const receita = {
        nome: inputNome.value,
        categoria: inputCategoria.value,
        receita: inputReceita.value,
        pessoa,
        minhaReceita,
        id: 0,
        curtido: false,
        salvo: false,
        img: img.src
    }

    const listaString = localStorage.getItem("receitas");

    if (listaString) {
        const lista = JSON.parse(listaString);

        const ultimoId = lista[lista.length - 1].id;

        receita.id = ultimoId + 1;

        lista.push(receita);

        const novaLista = JSON.stringify(lista);

        localStorage.setItem("receitas", novaLista)
    } else {
        receita.id = 1;

        const lista = [receita];

        const novaLista = JSON.stringify(lista);

        localStorage.setItem("receitas", novaLista)
    }

    const a = document.createElement("a");
    a.href = "minhas-receitas.html"

    a.click()
}

function deletar(id) {
    const listaString = localStorage.getItem("receitas");

    if (listaString) {
        const lista = JSON.parse(listaString);

        const index = lista.findIndex(x => x.id === id);

        lista.splice(index, 1);

        localStorage.setItem("receitas", JSON.stringify(lista));

        obterMinhasReceitas()
    }
}

function obterReceitas() {
    const listaString = localStorage.getItem("receitas");

    const divCategoria = document.getElementById("categoria")

    if (listaString) {
        const lista = JSON.parse(listaString);

        const listaAgrupada = [];

        for (let obj of lista) {
            if (!listaAgrupada[obj.categoria]) {
                listaAgrupada[obj.categoria] = [];
                listaAgrupada.push(listaAgrupada[obj.categoria]);
            }
            listaAgrupada[obj.categoria].push(obj);
        }

        let divNova = document.createElement("div")

        divNova.classList.add("item-3", "b");

        const length = Math.round(listaAgrupada.length / 3);

        let cont = 1;

        for (let item of listaAgrupada) {
            const div = document.createElement("div");
            const p = document.createElement("p")
            p.classList.add("titulo-3")
            p.innerText = item.find(x => x).categoria

            div.appendChild(p);

            const divItens = document.createElement("div");
            divItens.classList.add("itens");

            div.appendChild(divItens);

            for (let cat of item) {
                divItens.innerHTML += `<p onclick="window.location.replace('ver-receita.html?id=${cat.id}')">${cat.nome} <span>by ${cat.pessoa}</span></p>`
            }


            divNova.appendChild(div);

            if (cont % length === 0 || cont === listaAgrupada.length) {


                if (cont === listaAgrupada.length) {
                    divNova.classList.remove("b")
                }
                divCategoria.append(divNova);
                divNova = document.createElement("div");

                divNova.classList.add("item-3", "b");
            }

            cont++
        }
    }
}

function obterMinhasReceitas() {
    const listaString = localStorage.getItem("receitas");

    const divCategoria = document.getElementById("categoria");

    divCategoria.innerHTML = ""

    if (listaString) {
        const lista = JSON.parse(listaString).filter(x => x.minhaReceita);

        let cont = 1;

        for (item of lista) {
            const div = document.createElement("div");
            div.classList.add("itens-minhas");

            div.innerHTML = `
                    <p>${cont}</p>
                    <p>${item.nome}</p>
                    <span class="material-symbols-outlined delete" onclick="deletar(${item.id})">
                        delete
                    </span>`;

            cont++;

            divCategoria.appendChild(div)
        }

    }
}

function obterSalvos() {
    const listaString = localStorage.getItem("receitas");

    const divCategoria = document.getElementById("categoria");

    divCategoria.innerHTML = ""

    if (listaString) {
        const lista = JSON.parse(listaString).filter(x => x.salvo);

        let cont = 1;

        for (item of lista) {
            const div = document.createElement("div");
            div.classList.add("itens-minhas");

            div.innerHTML = `
                    <p>${cont}</p>
                    <p>${item.nome}</p>
                    
                    <span class="material-symbols-outlined ver" onclick="window.location.replace('ver-receita.html?id=${item.id}')">
                        visibility
                    </span>`;

            cont++;

            divCategoria.appendChild(div)
        }

    }
}

function obterReceitaPorId(id) {
    const listaString = localStorage.getItem("receitas");

    if (listaString) {
        const lista = JSON.parse(listaString)

        const receita = lista.find(x => x.id === Number(id));

        const titulo = document.getElementById("nome");

        titulo.innerHTML = `${receita.nome} <span>by ${receita.pessoa}</span>`

        const curtida = document.getElementById("curtida");
        if (receita.curtido) {
            curtida.classList.add("cheio")
        }

        const salvar = document.getElementById("salvar");
        if (receita.salvo) {
            salvar.classList.add("cheio")
        }

        const divReceita = document.getElementById("receita");
        divReceita.innerHTML = receita.receita

        const img = document.getElementById("img");
        img.src = receita.img
    }
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        const imgExiste = document.getElementById("img");
        const botao = document.getElementById("botao");
        botao.innerHTML = "Trocar imagem <span class='material-symbols-outlined'>image</span>"
        if (imgExiste) {
            imgExiste.src = reader.result;
        } else {
            const img = document.createElement("img")
            img.id = "img";
            img.src = reader.result;
            img.classList.add("img-receita")
            const div = document.getElementById("img-container");
            div.appendChild(img)
        }
    }
    reader.readAsDataURL(file);
}

function adicionarCurtida(e, id, tipo) {
    const listaString = localStorage.getItem("receitas");

    if (listaString) {
        const lista = JSON.parse(listaString)

        const index = lista.findIndex(x => x.id === Number(id));

        const receita = lista[index];

        if (e.target.classList.contains("cheio")) {
            e.target.classList.remove("cheio");

            if (tipo === "curtir")
                receita.curtido = false;
            else
                receita.salvo = false;
        } else {
            e.target.classList.add("cheio")

            if (tipo === "curtir")
                receita.curtido = true;
            else
                receita.salvo = true;
        }

        lista[index] = receita;

        localStorage.setItem("receitas", JSON.stringify(lista))
    }
}

