const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./modules/registers");
// const Book = require("./modules/book");

const Book = require("./modules/book");
// const Ride = require("./modules/ride");
const Ride = require("./modules/selfride");


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.get("/", (req, res) => {
    res.render("index")
});

app.get("/loginn", (req, res) => {
    res.render("loginn");
})


app.post("/register", async(req, res) => {

    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;


        if (password === cpassword) {

            const registerUser = new Register({

                name: req.body.name,
                mail: req.body.mail,
                number: req.body.number,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword

            })

            const registered = await registerUser.save();
            // res.status(201).render("index");

        } else {
            console.log.log(res.send("passwords are not matching"));

        }


    } catch (error) {
        res.status(400).send(error);
    }



})

app.get("/book", (req, res) => {
    res.render("book");
})



app.post("/book", async(req, res) => {
    try {


        const mail = req.body.mail;
        const password = req.body.password;



        const useremail = await Register.findOne({ mail: mail });
        if (useremail.password === password) {

            res.status(201).render("book");

        } else {

            res.status(400).send("invalid password or email. please try again");

        }

    } catch (error) {
        res.status(400).send("invalid password or email. please try again");
    }
})

app.get("/vehiclebook", (req, res) => {
    res.render("vehiclebook");
})



app.post("/vehiclebook", async(req, res) => {
    try {

        const bookUser = new Book({

            name: req.body.name,
            number: req.body.number,
            mail: req.body.mail,
            gender: req.body.gender,
            age: req.body.age,
            location: req.body.location,
            destination: req.body.destination,
            datetime: req.body.datetime

        })

        const booked = await bookUser.save();
        res.status(201);
        //.send("vehicle booked");

    } catch (error) {
        res.status(400)
            // .send("something went wrong");
    }
})






app.get("/ride", (req, res) => {
    res.render("ride");
})


app.post("/ride", async(req, res) => {


    try {

        const rideUser = new Ride({

            name: req.body.name,
            number: req.body.number,
            mail: req.body.mail,
            gender: req.body.gender,
            age: req.body.age,
            license: req.body.license,
            location: req.body.location,
            destination: req.body.destination,
            type: req.body.type,
            datetime: req.body.datetime

        })

        const done = await rideUser.save();
        res.status(201).send("vehicle booked");

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }


})




















app.listen(port, () => {
    console.log(` server is running at port no ${port}`);
})