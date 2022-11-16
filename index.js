const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
        {   
            id : 1,        
            name : "BIT",
            duration : "4 years",
            semesters : 8

        },
        {
            id : 2,
            name : "BCA",
            duration : "3 years",
            semesters : 6

        },
        {
            id : 3,
            name : "B Arch",
            duration : "5 years",
            semesters : 10

        },
        {
            id : 4,
            name : "BE Computer",
            duration : "4 years",
            semesters : 8

        },
        {
            id : 5,
            name : "BBA",
            duration : "4 years",
            semesters : 8

        }
    ];

app.get('/', (req, res)=>{
    res.send("Hello World");
    res.end();
})



app.get('/api/courses', (req, res)=>{
    res.json(courses);
})

app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course Not Found")
    }

    res.send(course);
})


app.post('/api/courses', (req, res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required,
        duration : Joi.string().required,
        semesters : Joi.number().required,
    })

    const {error, value} = schema.validate(req.body);
    console.log(error);

    if(!req.body.name || req.body.name.length < 2){
        res.status(400).send('Invalid data, try again!');
    }else{
        const course = {
            id: courses.length + 1,
            name : req.body.name,
            duration: req.body.duration,
            semesters : req.body.semesters
        }
    
        courses.push(course);
        res.send(course);
    }

    res.end();
    
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("listening to " + port)
})