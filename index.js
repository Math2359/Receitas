function adicionar() {
    const inputNome = document.getElementById("nome");
    const inputCategoria = document.getElementById("categoria");
    const inputReceita = document.getElementById("receita");
    const pessoa = "Formiguinhas"
    const minhaReceita = true;

    const receita = {
        nome: inputNome.value,
        categoria: inputCategoria.value,
        receita: inputReceita.value,
        pessoa,
        minhaReceita
    }

    const listaString = localStorage.getItem("receitas");

    if (listaString) {
        const lista = JSON.parse(listaString);

        lista.push(receita);

        const novaLista = JSON.stringify(lista);

        localStorage.setItem("receitas", novaLista)
    } else {
        const lista = [receita];
        
        const novaLista = JSON.stringify(lista);
        
        localStorage.setItem("receitas", novaLista)
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
                divItens.innerHTML += `<p>${cat.nome} <span>by ${cat.pessoa}</span></p>`
            }

            divCategoria.appendChild(div)
        }
    }
}