const url = "https://api-perfilpolitico.serenata.ai/api/candidate/2309762/"
d3.json(url)
    .then(res => {
        //alerta a quantidade de vezes que o candidato se candidatou
       alert(res.election_history.length);
        
    })
    .catch(() => {
        console.log('deu errado')
    })

