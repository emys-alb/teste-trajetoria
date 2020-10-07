// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then(res => {
        //alerta o valor do patrimonio da candidata.
       //alert(res.asset_history[1].value);
        
    })
    .catch(() => {
        console.log('deu errado')
    })

var 
    width = 880,
    height = 880;
    
var viewBox = {
    width: width,
    height: height
}

//Adiciona elemento no html.
var svg = d3.select("#grafico").append("svg")
    .attr("viewBox", "0 0 " + viewBox.width + " " + viewBox.height);