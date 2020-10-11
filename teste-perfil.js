// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history
        const elections = res.election_history

        const height = 350;
        const width = 600;
        
        //Adiciona o svg no html
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("padding", "30px 0px 0px 30px")
        .attr("id", "svg")

        //Criando o gráfico
        const g = svg.append("g")
            .attr("transform", 'translate(' + 65 + ', ' + 30 + ')')
        
        //Criando escalas
        const escalaX = d3.scaleTime()
            .domain([Date.parse(affillitions[0].started_in), Date.now()])
            .range([0, width])

        const escalaY = d3.scaleLinear()
            .domain([d3.min(assets, (d) => d.value), d3.max(assets, (d) => d.value)])
            .range([height - 40, 0])

        //Criar circulos com os valores do patrimonio    
        g.selectAll(".assetValues")
            .data(assets)
            .enter()
            .append("circle")
            .attr("class", "assetValues")
            .attr("cx", (d) => escalaX(new Date(d.year, 0, 1)))
            .attr("cy", (d) => escalaY(d.value))
            .attr("r", 7)
            .attr("fill", "#6f42c1")

        //Criar retas entre os valores TODO

        const path = d3.line()
            .data(assets)
            .enter()
            .x((d) => escalaX(new Date(d.year, 0, 1)))
            .y((d) => escalaY(d.value))
            .attr("stroke-width", 5)
            .attr("fill", "#6f42c1")

        g.selectAll(".path")
            .data(assets)
            .enter()
            .attr("class", "path")
            .append(path)
            
        
        //Preencher area TODO
        
        // Sinaliza se foi eleito ou não TODO
          /* g.selectAll(".affils")
            .data(elections.filter(d => d.elected))
            .enter()
            .append("rect")
            .attr("class", "affils")
            .attr("x", (d) => escalaX(new Date(d.year, 0, 1)))
            .attr("y", height)
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', 'green')*/
    })
