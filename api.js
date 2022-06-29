const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080

const contenido = {frase:'Frase inicial'}
const palabras = contenido.frase.split(' ')

app.get('/api/frase',(req,res)=>{
    res.json(contenido.frase)
})

app.get('/api/palabras/:pos',(req,res)=>{
    if((req.params.pos) > palabras.length){
        res.json({error: `La frase contiene ${palabras.length} posiciones.`})
    } else {
        const palabra = {buscada: palabras[req.params.pos - 1]}
        res.json(palabra)
    }
})

app.post('/api/palabras',(req,res)=>{
    palabras.push(req.body.palabra)
    contenido.frase = palabras.join(' ')
    const palabraAdded = {
        agregada: req.body.palabra,
        pos: palabras.length
    }
    res.json(palabraAdded)
})

app.put('/api/palabras/:pos',(req,res)=>{
    if (req.params.pos > palabras.length) {
        res.json({error: `La frase contiene ${palabras.length} posiciones.`})
    } else {
        const indice = req.params.pos - 1
        const palabraAnterior = palabras[indice]
        palabras[indice] = req.body.palabra
        contenido.frase = palabras.join(' ')
        const actualizacion = {
            actualizada: req.body.palabra,
            anterior: palabraAnterior
    }
    res.json(actualizacion)
    }
})

app.delete('/api/palabras/:pos', (req,res)=>{
    if (req.params.pos > palabras.length) {
        res.json({error: `La frase contiene ${palabras.length} posiciones.`})
    } else {
        const indice = req.params.pos - 1
        const eliminada = {
            eliminada: palabras.splice(indice,1)
        }
        console.log(palabras);
        contenido.frase = palabras.join(' ')
    
        res.json(eliminada)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Server listening [${PORT}]...`);
})
server.on('error', e => console.log(`Error on server`,e))