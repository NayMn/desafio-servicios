import express from 'express'
const app = express()

app.get('/', (req, res) => {
    resizeBy.json({ ok: true })
})

app.listen(5000, () => console.log('estoy escuchando'))



