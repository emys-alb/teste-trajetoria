// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history

        //Criando a escala
        var x = 0;
        var y = 0;
        
        var height = 800;
        var width = 880;
        
        //Adiciona elemento no html. ok
        const svg = d3.select("#grafico")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "svg")
        
        //Criar circulos com os valores do patrimonio    
            svg
            .selectAll("circle")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => (d.year))
            .attr("cy", (d) => (d.value))
            .attr("r", 8)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO
        
        //Preencher area //TODO
        

    })