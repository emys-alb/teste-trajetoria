const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"
d3.json(url)
    .then(res => {
        console.log("deu bom")
    })
    .catch(() => {
        console.log('deu errado')
    })
