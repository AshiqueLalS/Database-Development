const express = require('express')
const app = express()
const port =3000
const mongoose = require('mongoose')

async function main () {
    await mongoose.connect('mongodb+srv://ashiquelals7:todo_password@maincluster.0sj48.mongodb.net/?retryWrites=true&w=majority&appName=mainCluster');
}

main()
.then(res =>{
    console.log("MongoDB Connected")
})
.catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    task: String,
    isCompleted: Boolean,
    user: String
})

const Task = mongoose.model('Task', TaskSchema);

app.use(express.json())

// To get all task
app.get('/',async (req,res) =>{
    let tasks = await Task.find({})
    res.send(tasks)
})
//To get a specific task using id
app.get('/:id',async (req, res) =>{
    id = req.params.id
    let tasks = await Task.findById(id)
    res.send(tasks)
})

//To create a new task
app.post('/', (req,res) =>{
    Task.create(req.body)
    res.send("Added successfully")
})
//To edit an already existing task using id
app.put('/:id', (req, res)=>{
    id = req.params.id
    let task = req.body
    Task.findByIdAndUpdate(id, task).exec()
    res.send("Task edited")
})
//To delete an existing task using id
app.delete('/:id', (req, res) =>{
    id = req.params.id
    Task.findByIdAndDelete(id).exec()
    res.send("Task Deleted")
})

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
})