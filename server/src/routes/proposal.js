const express = require("express");
const Proposal = require("../models/Proposal");
const router = express.Router();
const { createProposal, getProposal, updateProposal, deleteProposal, getAllProposal, getAProposal } = require("../controllers/Proposal");

router.post("/add", createProposal);//post creation
router.get("/info", getProposal);//post info on vendor dashboard

router.get("/all", getAllProposal);  //to get all proposal datas from backend and displaying it in user mainpage
router.delete("/:proposalId", deleteProposal);//deleting vendor proposal
router.get("/:proposalId", getAProposal);//for vendor proposal update and user selection

router.put("/:proposalId", updateProposal);//for updating vendor proposal


module.exports = router;