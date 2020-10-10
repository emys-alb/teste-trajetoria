// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history

        const height = 350;
        const width = 600;
        
        //Adiciona elemento no html. ok
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("padding", "30px 60px 30px 30px")
        .attr("id", "svg")

        const g = this.svg
            .append('g')
        
        //Criando escalas
        const escalaX = d3.scaleTime()
        .domain([affillitions[0].started_in, "2020-10-08"])
        .rangeRound([0, this.width])

        const escalaY = d3.scaleLinear()
        .domain([d3.min(assets.value), d3.max(assets.value)])
        .range([this.height, 0])

        //Criar circulos com os valores do patrimonio    
        g.selectAll("circle")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => this.escalaX(d.year))
            .attr("cy", d => this.escalaY(d.value))
            .attr("r", 8)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO
        const line = d3.line()([10,60], [40, 90], [60, 10], [190, 10])

        d3.select("#svg")
            .append("path")
            .attr("d", line)
            .attr("stroke", "black")

        //Preencher area TODO
        
        // Sinalizar se foi eleito ou não TODO
    })