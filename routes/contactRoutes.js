import express from "express";
const router = express.Router();
import { getContacts, addContact, updateContact, deleteContact } from "../controllers/contactController.js";

router.get("/", getContacts);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;