//express api with mongodb connection
// 1 endpoint to save a student project
// 1 endpoint to get all student projects
// 1 endpoint to get a student project by id
// 1 endpoint to update a student project by id
// 1 endpoint to delete a student project by id
require('dotenv').config(); // load .env variables

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const StudentProject = require('./models/studentProject');

const app = express();

app.use(bodyParser.json());

console.log(process.env.URL);

//connect to mongodb
// use process variables for url
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database!');
}
)
.catch((e) => {
    console.log('Connection failed!');
    console.log(e);

}
);

//save a student project
app.post('/api/studentProjects', (req, res, next) => {
    //save student project to mongodb if there are no errors and the email is unique
    const studentProject = new StudentProject({
        title: req.body.title,
        description: req.body.description,
        technologies: req.body.technologies,
        sourceLink: req.body.githubLink,
        projectLink: req.body.projectLink,
        projectImage: req.body.projectImage,
        creator: req.body.creator
    });
    studentProject.save().then(createdStudentProject => {
        res.status(201).json({
            message: 'Student project added successfully',
            studentProjectId: createdStudentProject._id
        });
    }
    )
    .catch(error => {
        res.status(500).json({
            message: 'Creating a student project failed!',
            error: error
        });
    }
    );


});

//get all student projects
app.get('/api/studentProjects', (req, res, next) => {
    //retrieve all student projects from mongodb
    StudentProject.find().then(documents => {
        res.status(200).json({
            message: 'Student projects fetched successfully',
            studentProjects: documents
        });
    }
    )
    .catch(error => {
        res.status(500).json({
            message: 'Fetching student projects failed!',
            error: error
        });
    }
    );

});

//get a student project by id
app.get('/api/studentProjects/:id', (req, res, next) => {
        
});

//update a student project by id
app.put('/api/studentProjects/:id', (req, res, next) => {

}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

