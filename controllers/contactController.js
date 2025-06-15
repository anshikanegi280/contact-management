import Contact from "../models/contactModel.js";

export async function getContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: "Contacts retrieved successfully",
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve contacts",
      error: error.message
    });
  }
}

export async function addContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory: name, email, phone"
      });
    }

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: savedContact
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Contact with this email already exists"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create contact",
      error: error.message
    });
  }
}

export async function updateContact(req, res) {
  try {
    const { id } = req.params;
    
    // Check if contact exists
    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updated
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
      error: error.message
    });
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    
    // Check if contact exists
    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    await Contact.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
      error: error.message
    });
  }
}

export default {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
};