const fs = require('fs')
const data = require('../data.json')
const intl = require('intl')
const {date, grade } = require('../utils')

Intl.DateTimeFormat = intl.DateTimeFormat

exports.index = (req, res) => {
    let foundstudent = data.students.map((student)=>{
        return {
            ...student,
            grade: grade(student.grade)
        }
    }) 
    return res.render('students/index',{students: foundstudent})
}
exports.create = (req, res) => {
    return res.render('students/create')
}
exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") return res.send('Please fill the fild: ' + key)
    }
    let id = 1
    const lastStudent = data.students[data.students.length - 1]
    if(lastStudent){
        id = lastStudent
    }
    birth = Date.parse(req.body.birth)
    data.students.push({
        id,
        ...req.body,
        birth
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Ocorreu um erro: ' + err)

        return res.redirect('/students')
    })

}
exports.show = (req, res) => {
    const { id } = req.params

    const foundstudent = data.students.find(student => student.id == id)
    if (!foundstudent) return res.send('student not in databse in show')

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).birthDay,
        grade: grade(foundstudent.grade)
    }
    return res.render('students/show', { student })

}
exports.edit = (req, res) => {
    const { id } = req.params

    const foundstudent = data.students.find(student => student.id == id)
    if (!foundstudent) return res.send('student not in databse in edit')
    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).iso,
    }

    return res.render('students/edit', { student })
}

exports.update = (req, res) => {
    const { id } = req.body

    let index = 0

    const foundstudent = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex
            return true
        }

    })
    if (!foundstudent) return res.send('student not found')

    const student = {
        ...foundstudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) res.send('Error: ' + err)
    })

    return res.redirect(`/students/${id}`)
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredstudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredstudents

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) res.send('Error: ' + err)
    })
    return res.redirect("/students")
}