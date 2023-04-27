//student project mongoose schema
const mongoose = require('mongoose');

const studentProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: String, required: true },
    sourceLink: { type: String, required: true },
    projectLink: { type: String, required: true },
    projectImage: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
