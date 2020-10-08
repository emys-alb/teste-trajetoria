// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history

        var height = 350;
        var width = 600;
        
        //Adiciona elemento no html. ok
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("padding", "30px 60px 30px 30px")
        .attr("id", "svg")
        
        //Criando escalas
        escalaX = d3.scaleTime()
        .domain([affillitions[0].started_in, "2020-10-08"])
        .rangeRound([20, width - 50])

        escalaY = d3.scaleLinear()
        .domain([0, d3.max(assets, (d) => d.value)])
        .range([20, height - 100])
        
        //Criar circulos com os valores do patrimonio    
            svg
            .selectAll("circle")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => this.escalaX(d.year))
            .attr("cy", (d) => this.escalaY(d.value))
            .attr("r", 8)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO
        
        //Preencher area TODO
    })