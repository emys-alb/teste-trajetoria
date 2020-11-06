// URL com dados da candidata
const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"

//Coletando o dado.
d3.json(url)
    .then( res => {
        
        const assets = res.asset_history
        const affillitions = res.affiliation_history
        const elections = res.election_history

        const height = 440
        const width = 880
        const margin = { top: 20, right: 20, bottom: 20, left: 20 }

        const configuracoes = d3.formatLocale({
          decimal: ',',
          thousands: '.',
          grouping: [3],
          currency: ['R$ ', ' ']
        });

        const dinheiroConfig = configuracoes.format('$,.2f');
        const dataConfig = d3.timeFormat('%d/%m/%Y');

        //Adiciona o svg no html
        const svg = d3.select("#grafico")
        .append("svg")
        .attr('viewBox',"0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
        .attr("id", "svg")
        
        //Criando o gráfico
        const g = svg.append("g")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        //Criando escalas
        const escalaX = d3.scaleTime()
            .domain([Date.parse(affillitions[0].started_in), Date.now()])
            .range([0, width])

        const escalaY = d3.scaleLinear()
            .domain([0 , d3.max(assets, (d) => d.value)])
            .range([height, 10]);

        //Criandos Tooltips
        //Patrimonio
        var tooltipPatrimonio = d3.tip()
        .attr('class', 'tooltip')
        .attr('id', 'tooltipPatrimonio')
        .html((EVENT, d) => dinheiroConfig(d.value))

        svg.call(tooltipPatrimonio)

      //Preencher area
        const escalaCores = d3.scaleOrdinal([
          "#FFFCBB",
          "#FFC69F",
          "#CCA9DD",
          "#C8F4FF",
          "#FFBBBB"
        ])
          .domain([1, 80])
      
        g.selectAll('.affils')
          .data(affillitions)
          .enter()
          .append("rect")
          .attr("class", "affils")
            .attr("fill", (d,i) => { return escalaCores(i) })
            .attr("x", (d) => escalaX(Date.parse(d.started_in)))
            .attr("height", escalaY(height))
            .attr("width", (d, i) => {
              const inicio = escalaX(Date.parse(affillitions[i].started_in));
              let fim;
              if (i === affillitions.length - 1) {
                fim = escalaX(Date.now());
              } else {
                fim = escalaX(Date.parse(affillitions[i + 1].started_in));
              }

              return fim - inicio;
            })
            
          // Sinaliza se foi eleito ou não
          g.selectAll(".eleicoes")
            .data(elections)
            .enter()
            .append("rect")
            .attr("class", "eleicoes")
            .attr("x", (d) => escalaX(new Date(d.year, 0, 1)))
            .attr("y", height)
            .attr("width", (d) => {
            const inicio = escalaX(new Date(d.year, 0, 1));
            let fim;
            if (d.post === "SENADOR") {
              fim = escalaX(new Date(d.year + 8, 11, 30));
            } else {
              fim = escalaX(new Date(d.year + 4, 11, 30));
            }

            return fim - inicio;
          })
          .attr('height', 10)
          .attr('fill', (d) => {
            if(d.elected)
            return '#43a467'; 
            else
            return '#b54142';
          })
          
        //Linha dos mandatos
        g.selectAll(".mandatos")
          .data(elections)
          .enter()
          .append("rect")
          .attr("class", "mandatos")
          .attr("fill", "#353839")
            .attr("height", height + 10)
            .attr("width", 1)
            .attr("x", (d) => escalaX(new Date(d.year, 0, 1)))
            .attr("y", 0)
     
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
              .on("mouseover", tooltipPatrimonio.show)					
              .on("mouseout", tooltipPatrimonio.hide);
  
          //Criar retas entre os valores
            const line = d3.line()
            .x((d) => escalaX(new Date(d.year, 0, 1)))
            .y((d) => escalaY(d.value))
          
          g.append("path")
            .datum(assets)
            .attr("fill", "none")
            .attr("stroke", "#6f42c1")
            .attr("stroke-width", 5)
            .attr("d", line)

          //Eixo x
          const eixoX = d3.axisTop()
            .scale(escalaX)
            .tickSize(0)

            g.append('g')
            .attr('class', 'EixoX')
            .call(eixoX)
            .call( g => g.select(".domain").remove())
            .call(g => g.selectAll('textoEixoX')
              .attr('dy', height - 15))

              
            function divideSaida(d) {
              let valor;
              if(d <= 990000) 
                valor = d/1000 
              else 
                valor = d/1000000
               return valor 
            }

          //Eixo y (TODO legenda)
          const eixoY = d3.axisLeft() 
            .scale(escalaY)
            .tickSize(0)
            .tickFormat(divideSaida)

            g.append('g')
            .attr('class', 'EixoY')
            .call(eixoY)
            .call( g => g.select(".domain").remove())
            .call(g => g.selectAll('textoEixoY')
              .attr('dx', -this.width - 15)
              .attr('text-anchor', 'end')
              .text((d) => {
                let legenda = 'R$ ';
                let max = d3.max(assets);
                if(max < 990000) {
                  legenda += '(mil)'
                } else {
                  legenda += '(milhões)'
                }
                return legenda;
              }))
          })
