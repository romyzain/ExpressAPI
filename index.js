const express = require('express')
const appExpress = express()
const port = 2000
const bodyParser = require('body-parser')
const fs = require('fs')
appExpress.use(bodyParser())

let data = [
    {
        id : 1,
        nama : 'apel',
        harga : 20000 
    },
    {
        id : 2,
        nama : 'jeruk',
        harga : 15000 
    },
    {
        id : 3,
        nama : 'mangga',
        harga : 10000 
    }
]

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
            //method/parameter terima string / terima callback funct
appExpress.get('/testing', (req,res) => { //req. query
    //request => data yang datang dari Front-End
    //response => Jawaban yang dikasi kembali ke Front-End

    //GET
    //request => saya mau data product apel dong
    //cari cari cari => product => product namanya ada apel = data
    //response => silahkan ini data data

    // request => apel
    // req.query => bawa data di url setelah ?
    // localhost:2000/testing?nama=apel
    // {nama : 'apel', harga : '10000'}
    // http://localhost:2000/testing?nama=apel&harga=20000 
    // http://localhost:2000/testing?nama=apel
    // req.query = {nama : 'apel'}
    console.log(req.query.nama) //.nama .harga

    //kalo tidak ada query => return semua data product
    //kalo ada => return satu product

    // /users?usename=admin
    // [ { username : 'admin', password : 'admin'} ] pake filter kalo mau return array of object
    // kalo find return satu hal object ga bisa banyak
    // setiap pake query pake filter (best practice)

    // http://localhost:2000/testing?hargaMin=10000&hargaMax=25000 

    let newData = data //biar ga ganggu hasil data di atas

    if(req.query.nama){
        newData = newData.filter((val) => val.nama.includes(req.query.nama.toLowerCase())) //terima boolean
        // apel => a => true
        // jeruk => a => false
        // mangga => a => true
        // res.status(200).send(newData)
        // [
        //     {
        //         nama : 'apel'
        //     },
        //     {
        //         nama : 'mangga'
        //     },
        // ]
    }if(req.query.hargaMin){
        newData = newData.filter((val) => val.harga >= req.query.hargaMin) 
        // [
        //     {
        //         nama : 'mangga'
        //     }
        // ]
    }if(req.query.hargaMax){
        newData = newData.filter((val) => val.harga >= req.query.hargaMax)
    }
        res.status(200).send(newData)  
})

appExpress.get('/params/:id',(req,res) => { //ngambil data secara spesifik
    //req.params
    console.log(typeof(req.params.id)) //no ini string harus di parseInt
    // prop id tergantung yang di url { id : 1 }
    let dataId = data.find((val) => val.id === parseInt(req.params.id))
    res.status(200).send(dataId)
})

appExpress.post('/add-product',(req,res) => { //body-parser parsing agar bisa pake req.body
    // req.body
    console.log(req.body)
    // Axios.post(API_URL, data){
    //    .then((res) => {
    //        res => code 201 created => res.data => data yang berhasil di tambah
    //        Axios.get(API_URL/product)
    //          .then((res) => {
    //              this.setState()
    //   })
    // })
    // .catch((err) => {
    //
    //     })
    // }

    //req.body === parameter axios.post 
    console.log(req.body)
    data.push(req.body)
    // console.log(data)    
    res.status(200).send(data)

    // AXios.get (API_URL)setState
})

// Try Catch
appExpress.post('/try',(req,res) => {
    //Testing blocks of code di dalam try
    //req.body
    let { nama, usia, pekerjaan} = req.body
    try{
        // console.log('1') 
        // console.lg('masuk try') //2 tidak akan dibaca 
        // console.log('2')
        fs.writeFileSync('invoice.txt', `Nama saya : ${nama}\nUsia saya : ${usia}\nPekerjaan saya :${pekerjaan}`)
        let data = fs.readFileSync('invoice.txt', 'utf8')
        res.status(200).send(data) //harus biin invoice kalo bikin ecommerce
    }catch(err){
        console.log(err)
        fs.unlinkSync('invoice.txt')
        res.status(500).send(err.message)
    }
})

const { userRouter } = require('./router')
appExpress.use('/users', userRouter)

appExpress.listen(port, () => console.log(`API Active at Port ${port}`))