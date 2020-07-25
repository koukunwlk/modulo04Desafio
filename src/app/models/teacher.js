const db = require("../../config/db")
const { age, date } = require('../lib/utils')
module.exports = {
    all(callback) {
        db.query(
            `SELECT teachers.*, count(students) AS total_students
             FROM teachers
             LEFT JOIN students ON(teachers.id = students.teacher_id)
             GROUP BY teachers.id
            ORDER by total_students DESC`, (err, results) => {
            if (err) throw `Database error ${err}`

            return callback(results.rows)
        }
        )
    },
    create(data, callback) {
        const query = `INSERT INTO teachers(
            avatar_url,
            name,
            birth,
            degree,
            classroom,
            knowledge,
            created_at
        )VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.degree,
            data.classroom,
            data.knowledge,
            date(Date.now()).iso
        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database error ${err}`
            return callback(results.rows[0])
        })
    },
    find(id, callback) {
        const query = `SELECT * FROM teachers WHERE id = $1`
        db.query(query, [id], (err, results) => {
            if (err)`Database error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(
            `SELECT teachers.*, count(students) AS total_students
             FROM teachers
             LEFT JOIN students ON(teachers.id = students.teacher_id)
             WHERE teachers.name ILIKE '%${filter}%'
             OR teachers.knowledge ILIKE '%${filter}%'
             GROUP BY teachers.id
            ORDER by total_students DESC`, (err, results) => {
            if (err) throw `Database error ${err}`

            return callback(results.rows)
        }
        )
    },
    update(data, callback) {
        const query = `UPDATE teachers set
        avatar_url = ($1),
        name = ($2),
        birth = ($3),
        degree = ($4),
        classroom = ($5),
        knowledge = ($6)
        WHERE id =  $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.degree,
            data.classroom,
            data.knowledge,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`
            return callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error: ${err}`
            return callback()
        })
    }

}