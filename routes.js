const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res)=>{
    return res.redirect('/teachers')
})

routes.get('/teachers', (req, res)=>{
    return res.render('./teachers/index')
})

routes.get('/teachers/create', (req, res)=>{
    return res.render('./teachers/create')
} )

routes.post('/teachers/', teachers.post)

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.get('/students', (req, res)=>{
    return res.render('/members')
})


module.exports = routes






/* server.get('/', (req, res)=>{
    res.render('about')
})

server.get('/contents', (req, res)=>{
    res.render('contents', {contents})
})

server.get('/courses/:id', (req, res)=>{
    const id = req.params.id

    const content = contents.find((content)=>{
        if(content.id == id){
            return true
        }
    })

    if(!content){
        return res.send("Content not found")
    }
    
    return res.render('courses', {content})
    
})

server.use((req, res)=>{
    res.status(404).render('not-found')
}) */