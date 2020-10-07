// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
var dados = d3.json(url)
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

var data = [8, 56, 40 ,3 ,34, 20]

//Adiciona elemento no html.
d3.select("#grafico").append("svg")
    .attr("viewBox", "0 0 " + viewBox.width + " " + viewBox.height)
    .attr("id", "canvas");


//Criando circulos no svg
d3.select("#canvas")
    .selectAll("circle")
    .data(data)
    .join("circle")
        .attr("cx", data => data * 10)
        .attr("cy", 200)
        .attr("r", 8)
        .attr("fill", "purple");

