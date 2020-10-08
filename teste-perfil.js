// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affil = res.affiliation_history

        var height = 500;
        var width = 600;
        
        //Adiciona elemento no html. ok
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "svg")
        
        //Criando escalas
        escalaX = d3.scaleLinear()
        .domain([affil[0].started_in, 2020])
        .range([0, d3.max(assets, (d) => d.year)])

        
        //Criar circulos com os valores do patrimonio    
            svg
            .selectAll("circle")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => escalaX(d.year))
            .attr("cy", (d) => (d.value))
            .attr("r", 8)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO
        
        //Preencher area //TODO
        

    })