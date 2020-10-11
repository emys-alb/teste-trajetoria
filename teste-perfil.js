// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history

        const height = 350;
        const width = 600;
        
        //Adiciona o svg no html
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("padding", "30px 60px 30px 30px")
        .attr("id", "svg")

        const g = svg.append("g")
            .attr("transform", 'translate(' + 60 + ', ' + 30 + ')')
        
        //Criando escalas
        const escalaX = d3.scaleTime()
            .domain([affillitions[0].started_in, Date.now])
            .rangeRound([0, width])

        const escalaY = d3.scaleLinear()
            .domain([d3.min(assets, (d) => d.value), d3.max(assets, (d) => d.value)])
            .range([height, 0])

        //Criar circulos com os valores do patrimonio    
        g.selectAll("circle")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => escalaX(d.year))
            .attr("cy", (d) => escalaY(d.value))
            .attr("r", 8)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO
        
        //Preencher area TODO
        
        // Sinalizar se foi eleito ou não TODO
    })