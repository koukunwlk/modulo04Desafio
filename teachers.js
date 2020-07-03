const fs = require('fs')
const data = require('./data.json')

exports.post = (req, res) =>{
    const keys = Object.keys(req.body)
    for(key of keys){
        if(req.body[key] == "") return res.send('Please fill the fild: ' + key)
    }
    let {avatar_url, name, birth, degree, classroom, knowedge} = req.body
    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        classroom,
        knowedge,
        created_at
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 4),(err)=>{
        if(err) return res.send('Ocorreu um erro: ' + err)

        return res.redirect('/teachers')
    })

}