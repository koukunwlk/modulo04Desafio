const fs = require('fs')
const data = require('./data.json')
const intl = require('intl')
const {age, graduation, date} = require('./utils')

Intl.DateTimeFormat = intl.DateTimeFormat

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

exports.show = (req, res) => {
    const {id} = req.params

    const foundTeacher = data.teachers.find( teacher => teacher.id == id)
        if(!foundTeacher) return res.send('Teacher not in databse')

        const teacher  = {
            ...foundTeacher,
            birth: age(foundTeacher.birth),
            created_at: new Intl.DateTimeFormat('pt-Br').format(foundTeacher.created_at),
            knowedge: foundTeacher.knowedge.split(','),
            degree: graduation(foundTeacher.degree),
            classroom: foundTeacher.classroom.toUpperCase()
        }
        return res.render('teachers/show', {teacher})
    
}

exports.edit = (req, res) => {
    const {id} = req.params

    const foundTeacher = data.teachers.find( teacher => teacher.id == id)
        if(!foundTeacher) return res.send('Teacher not in databse')
    const teacher = {
        ...foundTeacher,
            birth: date(foundTeacher.birth),
            degree: graduation(foundTeacher.degree)}

    return res.render('teachers/edit', {teacher})
}


exports.update = (req, res) => {
    const {id} = req.body

    let index = 0

    const foundteacher = data.teachers.find((teacher, foundIndex)=>{
        if(id == teacher.id){
            index = foundIndex
            return true
        }
        
    })
    if(!foundteacher) return res.send('teacher not found')

    const teacher = {
        ...foundteacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if(err) res.send('Error: ' + err)})
       
    return res.redirect(`/teachers/${id}`)
    

}

exports.delete = (req, res)=>{
    const {id} = req.body

    const filteredTeachers = data.teachers.filter((teacher)=>{
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if(err) res.send('Error: ' + err)})
    return res.redirect("/teachers")
}