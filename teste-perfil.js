// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"
let dataset = [];

//Coletando o dado.
d3.json(url)
    .then(res => {
        //alerta o valor do patrimonio da candidata.
       alert(res.asset_history[1].value);

       for (let index = 0; index < asset_history.length; index++) {
           const element = asset_history[index];
            dataset.push(element.value)
            alert(element.value)
       }
        
    })
    .catch(() => {
        console.log('deu errado')
    })
