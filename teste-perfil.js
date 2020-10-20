// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history
        const elections = res.election_history

        const height = 350
        const width = 600
        
        //Adiciona o svg no html
        const svg = d3.select("#grafico")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("padding", "30px 0px 0px 0px")
        .attr("id", "svg")

        //Criando o gráfico
        const g = svg.append("g")
            .attr("transform", 'translate(' + 65 + ', ' + 30 + ')')
        
        //Criando escalas
        const escalaX = d3.scaleTime()
            .domain([Date.parse(affillitions[0].started_in), Date.now()])
            .range([0, width - 30])

        const escalaY = d3.scaleLinear()
            .domain([d3.min(assets, (d) => d.value), d3.max(assets, (d) => d.value)])
            .range([height - 60, 0]);
            
        //Preencher area
        g.selectAll('.affils')
          .data(affillitions)
          .enter()
          .append("rect")
          .attr("class", "affils")
            .attr("fill", "#fdfd96")
            .attr("height", escalaY(height))
            .attr("width", (d, i) => {
              const inicio = escalaX(Date.parse(affillitions[0].started_in));
              let fim;
              if (i === affillitions.length - 1) {
                fim = escalaX(Date.now());
              } else {
                fim = escalaX(Date.parse(d.started_in));
              }
              return fim - inicio;
            })
            

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

        //Criar retas entre os valores
            const line = d3.line()
            .x((d) => escalaX(new Date(d.year, 0, 1)))
            .y((d) => escalaY(d.value))
            
            g.append("path")
              .datum(assets)
              .attr("fill", "none")
              .attr("stroke", "#6f42c1")
              .attr("stroke-width", 4)
              .attr("d", line)
              
        // Sinaliza se foi eleito ou não
           g.selectAll(".mandatos")
            .data(elections.filter(d => d.elected))
            .enter()
            .append("rect")
            .attr("class", "mandatos")
              .attr("x", (d) => escalaX(new Date(d.year, 0, 1)))
              .attr("y", height - 40)
              .attr('width', (d) => {
                  const inicio = escalaX(new Date(d.year, 0, 1));
                  let fim;
                  if (d.post === 'SENADOR') {
                    fim = escalaX(new Date(d.year + 8, 11, 30));
                  } else {
                    fim = escalaX(new Date(d.year + 4, 11, 30));
                  }
                  return fim - inicio;
                })
              .attr('height', 10)
              .attr('fill', 'green')
    })
