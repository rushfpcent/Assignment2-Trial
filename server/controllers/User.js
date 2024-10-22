const User = require('../models/User.js')

const create = async(req,res) => {
    console.log(req.body);
    const user = new User(req.body);
    console.log(user);
    try {
        await user.save();
        return res.status(200).json({
            message:"Added Successfully"
        });
    } catch (err)
    {
        console.log(err)
        return res.status(400).json({
            error: err.message
        });
    }
}
//update
const list = async (req,res) => {
    try{
        const users = await User.find().select('name email created updated')
        res.json(users)
    } catch (err)
    {
        return res.status(400).json({
            error:"Could not retrieve users"
        })
    }
}
const userByID = async(req,res,next, id) => {
    try{
        let user = await User.findById(id)
        if(!user) {
            return res.status('400').json({
                error:"User does not exist"
            });
        }
        req.profile = user;
        next();
    } catch (err) 
    {
        return res.send(400).json({
            error:"Error retrieving user"
        });
    }
};

const read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
};

const update = async(req,res) => {
    try{
        let user = req.profile;
        user = Object.assign(user,req.body)

        if(req.body.password) {
            user.password = req.body.password;
        }
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) 
    {
        console.log('Update Error', err)
        return res.status(400).json({
            error: err.message
        });
    }
};
const remove = async(req,res) => {
    try{
        let user = req.profile
        let deletedUser = await user.deleteOne();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err)
    {
        return res.status(400).json({
            error: err.message
        })
    }
}

const removeAll = async (req, res) => {
    try {
        await User.deleteMany();  // Delete all users
        res.json({
            message: "All users deleted successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};
module.exports = {create, userByID, list, read, remove, update, removeAll}