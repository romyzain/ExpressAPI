const express = require('express')
const appExpress = express()
const port = 2000
const bodyParser = require('body-parser')
appExpress.use(bodyParser())

appExpress.get('/',(req, res) => { //param pertama endpoint param kedua method
    res.status(200).send('<h1>Welcome to my API</h1>')
})
appExpress.post('/post',(req, res) => { 
    console.log(req.body)
    //Axios.post(APIURL, data){}

    //pentingg !1!1!1!1!
    //req.body = ambil data dari fornt end
    //req.params = data dari utl endpoint /patch/:id
    //req.query = search => url
    if(req.body.username === 'Romy'){
        res.status(200).send('<h1>Lanjut</h1>')
    }else{
        res.status(500).send('<h1>Gaboleh</h1>')
    }
    res.status(200).send('<h1>Post</h1>')
})
appExpress.patch('/patch/:id/:haha',(req, res) => { //req.params harus di tentuin terima berapa
    console.log(req.params)
    res.status(200).send('<h1>Patch</h1>')
})
appExpress.put('/put',(req, res) => { //req.query
    console.log(req.query)
    res.status(200).send('<h1>Put</h1>')
})
appExpress.delete('/',(req, res) => {
    res.status(200).send('<h1>Delete</h1>')
})

//Router => simpen semua alamat => url & method 
//Controller => function yang di jalanin/execute ketika url endpoint di akses

const { userRouter } = require('./router')
appExpress.use('/users', userRouter)

appExpress.listen(port, () => console.log(`API Active at Port ${port}`))