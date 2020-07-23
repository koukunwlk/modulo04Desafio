const { age, date, grade } = require('../lib/utils')
const student = require("../models/student")

module.exports = {
    index(req, res) {
        student.all((students) => {
            return res.render('students/index', { students })
        })
    },

    create(req, res) {
        return res.render('students/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (key == "") {
                return res.send("Please fill the field", key)
            }
        }
        student.create(req.body, (student) => {
            return res.redirect(`students/${student.id}`)
        })
    },

    show(req, res) {
        student.find(req.params.id, (student) => {
            if (!student) return res.send("student not found in Database")
            student.age = age(student.birth)
            student.grade = grade(student.grade)
            return res.render(`students/show`, { student })
        })
    },

    edit(req, res) {
        student.find(req.params.id, (student) => {
            if (!student) return res.send("student not found in Database")
            student.birth = date(student.birth).iso
            return res.render("students/edit", { student })
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (key == "") {
                return res.send("Please fill the field", key)
            }
        }
        student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`)
        })
    },

    delete(req, res) {
        student.delete(req.body.id, () => {
            return res.redirect("/students")
        })
    }
}
