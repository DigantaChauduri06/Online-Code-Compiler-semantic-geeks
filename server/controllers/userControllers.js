const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {

        // check if the user entered all the fields
        if(!(req.body.firstname && req.body.lastname && req.body.email && req.body.password && req.body.confirmpassword)) {
            return res.status(401).send({
                success: false,
                message: 'Please enter all the inputs'
            })
        }
        
        const user = await User.findOne({ email: req.body.email});

        // check if the email id already exists
        if(user) {
            return res.status(401).send({
                success: false,
                message: 'user with this email-ID already exists'
            });
        }

        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        // check if the password and confirm password does match with each other or not
        if(password.trim() !== confirmpassword.trim()) {
            return res.status(401).send({
                success: false,
                message: 'password and confirm password does not match'
            });
        }

        // create new user
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });

        // generating token after user successfully registered
        const token = newUser.generateToken();


        res.status(201).send({
            success: true,
            message: 'user created successfully',
            userInfo: newUser,
            token: token
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message
        });

    }
};

const loginUser = async (req, res) => {
    try {

        // check if user entered all the fields
        if(!(req.body.email && req.body.password)) {
            return res.status(401).send({
                success: false,
                message: 'Please enter all the inputs'
            })
        }        

        const user = await User.findOne({ email: req.body.email});

        // check if the email-ID already exists or not
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        // checking weather the password entered by the user matches with the hashed password stored inside 
        // database
        const isEneteredPasswordCorrect = await user.comparePasswords(req.body.password);

        if(!isEneteredPasswordCorrect) {

            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        // generate token
        const token = user.generateToken();

    
        res.status(200).send({
            success: true,
            message: `You are logged in successfully.`,
            token
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message
        });

    }
};


// get user profile details after user login or signup
const getAuthUsersDetails = async (req, res) => {
    try {
        
        res.status(200).json({
            success: true,
            userDetails: {
                fullname: req.user.userFullName,
                email: req.user.userEmail
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        });

    }
}


module.exports = {
    registerUser,
    loginUser,
    getAuthUsersDetails
}