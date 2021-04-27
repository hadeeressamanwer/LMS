const Joi = require ('joi');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const express=require ('express');

const app =express();
app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.json()); //TP MAKE IT UNDERSTAND JASON SENT FROM FRONT END
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/form.html')

})
const Courses =[
{id: 1, name:'Math2',code: "cse334",description:"provide full math2"},
{id: 2, name:'physics',code: "cse364",description:"provide full physics"},
{id: 3, name:'co2',code: "cse343",description:"provide full co2"},
{id: 4, name:'security',code: "cse344",description:"provide full security"},

]
const Students=[

{    id: 1, name:'Hadeer',code: "1601646"},
{    id: 2, name:'Essam',code: "1601647"},
 {   id: 3, name:'Mahmoud',code: "1601648"},
 {   id: 4, name:'Anwer',code: "1601649"},
]


app.get('/api/courses',(req,res)=>{
    res.send(Courses);
    });
    
    app.get('/api/courses/:id',(req,res)=> {
    const course=Courses.find(c => c.id == parseInt(req.params.id));
    if (!course)res.status(400).send('The course is not found')
    res.send(course.name);// req.query
    });
    
    app.post('/api/courses',urlencodedParser,(req,res)=>
    { 
       const validation = validateCourse(req.body);
       const {error}=validateCourse(req.body); 
       if (error)
       {
        res.status(400).send(validation.error.details[0].message); 
       return;
        }
    const course={
        id: Courses.length +1,
        name: req.body.name,
        code :req.body.code,
        description: req.body.description,
       };
    Courses.push(course);
    res.send(course);
    });
    app.put('/api/courses/:id',(req,res)=>
    {
       const course=Courses.find(c => c.id == parseInt(req.params.id));
        if (!course)res.status(400).send('The course is not found')
        const validation=validateCourse(req.body); 
        const {error}=validateCourse(req.body); 
            if (error)
            {
             res.status(400).send(validation.error.details[0].message); 
            return;
             }
    course.name=req.body.name;
    res.send(course);
    
    });
    app.delete('/api/courses/:id',(req,res)=>
    {
    
        const course=Courses.find(c => c.id == parseInt(req.params.id));
        if (!course)res.status(400).send('The course is not found');
      const index= Courses.indexOf(course);
      Courses.splice(index,1);
    
    res.send(course);
    });
    



    app.get('/api/students',(req,res)=>{
        res.send(Students);
        });
        app.get('/api/students/:id',(req,res)=> {
        const student=Students.find(c => c.id == parseInt(req.params.id));
        if (!student)res.status(400).send('The student is not found')
        res.send(student);// req.query
        });
        
        app.post('/api/students',urlencodedParser,(req,res)=>
        {
            const validation=validateStudent(req.body); 
            const {error}=validateStudent(req.body); 
                if (error)
                {
                 res.status(400).send(validation.error.details[0].message); 
                return;
                 }
        const student={
         id: Students.length +1,
         code :req.body.code,
         name: req.body.name,
        };
        Students.push(student);
        res.send(student);
        });
        
        app.put('/api/students/:id',(req,res)=>
        {
           const student=Students.find(c => c.id == parseInt(req.params.id));
            if (!student)res.status(400).send('The course is not found')
            const validation=validateStudent(req.body); 
            const {error}=validateStudent(req.body); 
                if (error)
                {
                 res.status(400).send(validation.error.details[0].message); 
                return;
                 }
        student.name=req.body.name;
        student.code=req.body.code;
        
        res.send(student);
        
        });
        app.delete('/api/students/:id',(req,res)=>
        {
            const student=Students.find(c => c.id == parseInt(req.params.id));
            if (!student)res.status(400).send('The course is not found');
          const index= Students.indexOf(student);
          Students.splice(index,1);
        
        res.send(student);
        });




    port=process.env.PORT || 3000 ; 
    app.listen(port,()=>console.log('Listening on port '+port+'.....'));
    
    function validateCourse(course) {
        const schema = Joi.object({
            name: Joi.string() .min(5).required(),
            code: Joi.string() .min(5) .required(),
            description: Joi.string() .optional().max(200),

           });
               
            return schema.validate(course); 
    }
    function validateStudent(student) {
        const schema = Joi.object({
            name: Joi.string() .min(3) .required(),
            code: Joi.string() .min(7) .required(),

           });
               
            return schema.validate(student); 
    }
        
    
    
