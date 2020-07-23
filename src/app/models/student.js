const db = require("../../config/db")
const { age, date } = require('../lib/utils')
module.exports = {
    all(callback) {
        db.query(
            `SELECT * FROM students
            ORDER by name ASC`, (err, results) => {
            if (err) throw `Database error ${err}`

            return callback(results.rows)
        }
        )
    },
    create(data, callback) {
        const query = `INSERT INTO students(
            avatar_url,
            name,
            email,
            birth,
            grade,
            academicload
        )VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.academicload
        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database error ${err}`
            return callback(results.rows[0])
        })
    },
    find(id, callback) {
        const query = `SELECT * FROM students WHERE id = $1`
        db.query(query, [id], (err, results) => {
            if (err)`Database error ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `UPDATE students set
        avatar_url = ($1),
        name = ($2),
        email = ($3),
        birth = ($4),
        grade = ($5),
        academicload = ($6)
        WHERE id =  $7
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.academicload,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error: ${err}`
            return callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], (err, results) => {
            if (err) throw `Database error: ${err}`
            return callback()
        })
    }

}