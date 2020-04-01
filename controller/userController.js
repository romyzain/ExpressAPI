let data = [
    {
        id : 1,
        username : 'admin',
        password : 'admin',
        role : 'admin'
    },
    {
        id : 2,
        username : 'lian',
        password : '123',
        role : 'user'
    },
    {
        id : 3,
        username : 'romy',
        password : 'qwerty',
        role : 'user'
    }
]

module.exports = {
    getAllUsers : (req, res) => {
        res.status(200).send(data)
    },
    getUserById :(req, res) => {
        let byId = data.find((val) => val.id === parseInt(req.params.id))
        console.log(byId)
        if(byId){
            res.status(200).send(byId)
        }else{
            res.status(404).send('Not Found')
        }
    },
    searchByUsername : (req,res) => {
        let username = req.query.username
        let byUsername = data.filter((val) => val.username.includes(username))
        if(byUsername.length > 0){
            res.status(200).send(byUsername)
        }else if(val.username === 'admin'){
            res.status(200).send(data)
        }
    },
    login : (req, res) => {
        let username = req.params.username
        let password = req.params.password
        console.log(username)
        console.log(password)
        let logged = data.find((val) => val.username === username && val.password === password)

        if(logged){
            res.status(200).send(logged)
        }else{
            res.status(404).send('Not Found')
        }
    },
    searchByrole : (req, res) => {
        let role = req.query.role
        let byRole = data.filter((val) => val.role.includes(role))
        if(byRole){
            res.status(200).send(byRole)
        }else{
            res.status(404).send('Not Found')
        }
    }
}