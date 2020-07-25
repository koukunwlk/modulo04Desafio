
const { age, graduation, date } = require('../lib/utils')
const teacher = require("../models/teacher")

module.exports = {
    index(req, res) {
        const {filter} = req.query
        if(filter){
            teacher.findBy(filter, function(teachers){
            return res.render('teachers/index', { teachers, filter })
            })
        }else{
        teacher.all((teachers) => {
            return res.render('teachers/index', { teachers })
        })}
    },

    create(req, res) {
        return res.render('teachers/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (key == "") {
                return res.send("Please fill the field", key)
            }
        }
        teacher.create(req.body, (teacher) => {
            return res.redirect(`teachers/${teacher.id}`)
        })
    },

    show(req, res) {
        teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send("Teacher not found in Database")
            teacher.age = age(teacher.birth)
            teacher.knowledge = teacher.knowledge.split(",")
            teacher.degree = graduation(teacher.degree)
            teacher.created_at = date(teacher.created_at).format
            return res.render(`teachers/show`, { teacher })
        })
    },

    edit(req, res) {
        teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send("Teacher not found in Database")
            teacher.birth = date(teacher.birth).iso
            return res.render("teachers/edit", { teacher })
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (key == "") {
                return res.send("Please fill the field", key)
            }
        }
        teacher.update(req.body, () => {
            return res.redirect(`teachers/${req.body.id}`)
        })
    },

    delete(req, res) {
        teacher.delete(req.body.id, () => {
            return res.redirect("/")
        })
    }
}




/* Intl.DateTimeFormat = intl.DateTimeFormat

exports.index = (req, res) => {
    let foundTeacher = data.teachers.map((teacher)=>{
        return {
            ...teacher,
            knowledge: teacher.knowledge.split(',')
        }
    })
    return res.render('teachers/index',{teachers: foundTeacher})
}
exports.create = (req, res)=>{
    return res.render('./teachers/create')
}
exports.post = (req, res) => {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "") return res.send('Please fill the fild: ' + key)
    }
    let { avatar_url, name, birth, degree, classroom, knowledge } = req.body

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
        knowledge,
        created_at
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('Ocorreu um erro: ' + err)

        return res.redirect('/teachers')
    })

}

exports.show = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find(teacher => teacher.id == id)
    if (!foundTeacher) return res.send('Teacher not in databse')

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat('pt-Br').format(foundTeacher.created_at),
        knowledge: foundTeacher.knowledge.split(','),
        degree: graduation(foundTeacher.degree),
        classroom: foundTeacher.classroom.toUpperCase()
    }
    return res.render('teachers/show', { teacher })

}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find(teacher => teacher.id == id)
    if (!foundTeacher) return res.send('Teacher not in databse')
    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth),
        degree: graduation(foundTeacher.degree)
    }

    return res.render('teachers/edit', { teacher })
}


exports.update = (req, res) => {
    const { id } = req.body

    let index = 0

    const foundteacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }

    })
    if (!foundteacher) return res.send('teacher not found')

    const teacher = {
        ...foundteacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) res.send('Error: ' + err)
    })

    return res.redirect(`/teachers/${id}`)
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) res.send('Error: ' + err)
    })
    return res.redirect("/teachers")
} */