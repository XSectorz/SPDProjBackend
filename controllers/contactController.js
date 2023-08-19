const asyncHandler = require("express-async-handler"); 
const Contact = require("../models/contactModel");

//@desc Get all user contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req,res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Get user contacts
//@route POST /api/contacts/:id
//@access public
const getContacts = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create new user contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req,res) => {
    console.log("Req body is: ",req.body);
    const {name, email} = req.body;
    if(!name || !email) {
        res.status(400);
        throw new Error("Some field Empty");
    }
    const contact = await Contact.create({
        name,
        email,
    });
    res.status(201).json(contact);
});

//@desc Update user contacts
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res) => {

    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )

    res.status(200).json(updateContact);
});

//@desc Delete user contacts
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res) => {

    const contact = await Contact.findById(req.params.id);

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.remove();
    res.status(200).json(contact);
});


module.exports = { 
    getContact , 
    createContact, 
    getContacts, 
    updateContact, 
    deleteContact
};