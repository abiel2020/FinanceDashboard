import express from "express";
import Transaction from "../models/Transactions.js";


const router = express.Router();

router.get("/transactions", async(req, res) => {
    // Fetch data from database
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;