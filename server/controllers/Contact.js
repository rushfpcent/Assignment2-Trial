const Contact = require('../models/Contact.js')

const create = async(req,res) => {
    console.log(req.body);
    const contact = new Contact(req.body);
    console.log(contact);
    try {
        await contact.save();
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
};

const list = async (req,res) => {
    try{
        const contacts = await Contact.find().select('firstname lastname email')
        res.json(contacts)
    } catch (err)
    {
        return res.status(400).json({
            error:"Could not retrieve users"
        })
    }
};

const contactByID = async(req,res,next, id) => {
    try{
        let contact = await Contact.findById(id)
        if(!contact) {
            return res.status('400').json({
                error:"Contact does not exist"
            });
        }
        req.profile = contact;
        next();
    } catch (err) 
    {
        return res.send(400).json({
            error:"Error retrieving contact"
        });
    }
};

const read = (req,res) => {
    return res.json(req.profile)
};

const update = async(req,res) => {
    try{
        let contact = req.profile;
        contact = Object.assign(contact,req.body)
        await contact.save()
        res.json(contact)
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
        let contact = req.profile
        let deletedContact = await contact.deleteOne();
        res.json(deletedContact);
    } catch (err)
    {
        return res.status(400).json({
            error: err.message
        })
    }
};

const removeAll = async (req, res) => {
    try {
        await Contact.deleteMany();  // Delete all contacts
        res.json({
            message: "All contacts deleted successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

module.exports = {create,contactByID, list, read, remove, update, removeAll}