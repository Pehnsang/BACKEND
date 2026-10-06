import { User } from "../model/user.model.js";

export const regUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // to check if any of these 3 are empty =>
        //  invalid response

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are important!" })
        }

        // check if user exist
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "user already exist!" })
        }

        // create user 
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User Registered.",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "The server is down!!", error: error.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("1.Received Email", email);

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) return res.status(400).json({
            message: "User not found!!"
        });

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        };

        res.status(200).json({
            message: "User Locked In",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        })

        res.status(200).json({
            message: "Log Out"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

