import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { userDetails } from "./models/sypherdb.js";
import { Tshirts } from "./models/sypherdb.js";
import { Trousers } from "./models/sypherdb.js";
import { Cart } from "./models/sypherdb.js";
import { Jeans } from "./models/sypherdb.js";

let a = await mongoose.connect('mongodb://localhost:27017/sypher');
const app = express();
const port = 3000;
var userName="";
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.get("/", (req,res)=>{
    res.render("home.ejs",{main: userName});
})

app.get("/login", (req,res)=>{
    res.render("login.ejs");
})

app.get("/signup", (req,res)=>{
    res.render("signup.ejs");
})

app.post("/signupdone", async (req, res) => {
    try {
        const existingUser = await userDetails.findOne({ username: req.body.email });

        if (existingUser) {
            // Send an error message to the client
            return res.send(`
                <script>
                    alert("Email already exists");
                    window.location.href = "/login";
                </script>
            `);
        } else {
            // Create a new user
            const newUser = new userDetails({
                username: req.body.email,
                password: req.body["password"]
            });
            
            if (req.body.password != req.body.cpassword) {
                // Send an error message to the client

                return res.send(`
                    <script>
                        alert("Confirm password doesn't match the password");
                        window.location.href = "/signup";
                    </script>
                `);
            }

            await newUser.save();
            userName=req.body.email;
            res.send(`
                <script>
                    alert("User created");
                    window.location.href = "/";
                </script>
            `);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/logindone", async (req, res) => {
    try {
  
      // Find the user by email
      const user = await userDetails.findOne({ username: req.body.username });
  
      if (!user) {
        // Send an error message if user not found
        return res.send(`
          <script>
            alert("Invalid email or password");
            window.location.href = "/login";
          </script>
        `);
      }
  
      // Check password match using bcrypt (recommended)
       // Replace with your password hashing method
  
      if (user.password!=req.body.password) {
        // Send an error message if password doesn't match
        return res.send(`
          <script>
            alert("Invalid email or password");
            window.location.href = "/login";
          </script>
        `);
      }
      userName = user.username;
      res.send(`
        <script>
            alert("Login In Success");
            window.location.href = "/";
        </script>
    `);
    
    } 
    catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  });


app.get("/tshirts/product_view/:id",async (req,res)=>{
    try {
        const id = req.params.id;  // Corrected the parameter name
        const product = await Tshirts.findOne({ _id: id });  // Use findOne instead of find for a single item

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render("product_view.ejs", { product,main: userName });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get("/trousers/product_view/:id",async (req,res)=>{
    try {
        const id = req.params.id;  // Corrected the parameter name
        const product = await Trousers.findOne({ _id: id });  // Use findOne instead of find for a single item

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render("product_view.ejs", { product ,main: userName});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get("/jeans/product_view/:id",async (req,res)=>{
    try {
        const id = req.params.id;  // Corrected the parameter name
        const product = await Jeans.findOne({ _id: id });  // Use findOne instead of find for a single item

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render("product_view.ejs", { product ,main: userName});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


app.get("/productpage", (req,res)=>{
    res.render("productpage.ejs",{main: userName});
});

app.get('/tshirts', async (req, res) => {
    try {
        const products = await Tshirts.find({});
        res.render('tshirts.ejs', { products,main: userName }); // Assuming you're using EJS
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

app.get('/trousers', async (req, res) => {
    try {
        const products = await Trousers.find({});
        res.render('trousers.ejs', { products ,main: userName}); // Assuming you're using EJS
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});

app.get('/jeans', async (req, res) => {
    try {
        const products = await Jeans.find({});
        res.render('jeans.ejs', { products,main: userName }); // Assuming you're using EJS
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching products');
    }
});



app.get("/cart", async (req,res)=>{
    try {
       
        const cartItems = await Cart.find({}); // Adjust query based on your schema

        res.render('cart', { cartItems, main:userName });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching cart items');
    }
});






 app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
 });
