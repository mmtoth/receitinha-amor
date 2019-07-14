const botao = document.querySelector('#enviarReceita')
botao.addEventListener("click", enviarReceita)
function enviarReceita () {
  const receita = document.querySelector("#nomeReceita").value
  const motivo = document.querySelector("#especial").value
  const tipo = document.querySelector("#inputTipo").value
  const ingredientes = document.querySelector("#ingredientes").value
  const preparo = document.querySelector("#preparo").value

  const receitas = {
    receita, motivo, tipo, ingredientes, preparo
  }
  fetch(
    'http://localhost:3036/receitas',
    {
      method: 'POST',
      body: JSON.stringify(receitas),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}


const Resultado = document.querySelector('#enviadas')

fetch('http://localhost:3036/receitas')
    .then (response =>{
        return response.json();
    })
    .then(data => {
        data.forEach(receitaShow => {
            
            let box = document.createElement('div');
            box.setAttribute('class', 'receitaShow');
            Resultado.appendChild(box);

            let titulo = document.createElement("h3");
            titulo.innerHTML = receitaShow.receita
            box.appendChild(titulo);
        })
        })