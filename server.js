require('dotenv').config();
const express = require("express");
const app = express();
const db = require('./db'); 
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

//Registeration and Login
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerators");

//Middleware
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

//Get all Users
app.get("/users", async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM users");
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                profiles: results.rows,
            },
        });

    } catch (error) {
        console.log(error);
    }
})

//Get a user
app.get("/user/:id", async(req,res) =>{
    console.log(req.params.id);
    
    try {
        const results = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
    } catch (error) {
        console.log(error);
    }
})

//Login
app.post("/login", async(req, res) => {

    try {

        //Destructure the req.body
        const {email, password} = req.body;

        //Check if user doesnt exist(if not then we throw error)
        const user = await db.query("SELECT * FROM users WHERE email = $1",[email]);

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }

        //Check if incoming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }

        //Give them the jwt token
        const token = jwtGenerator(user.rows[0].userid);
        
        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

//Register
app.post("/register", async(req,res) => {
    console.log(req.body);

    try {

        //Destructure the req.body (username, fullname, email, password, phonenumber, school)
        const { username, email, password} = req.body;

        //Check if user exist (if user exist then throw error)
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length !==0){
            return res.status(401).send("User already exist")
        }

        //Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt (saltRound);
        const bcryptPassword = await bcrypt.hash (password, salt);

        //Enter a new user inside the database
        const newUser = await db.query("INSERT INTO users (name, email, password) values ($1,$2,$3) returning *", 
        [username, email, bcryptPassword]);

        //Generating jwt token
        const token = jwtGenerator(newUser.rows[0].userid);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


const port = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`Server is up and listening on port ${PORT}`);
});