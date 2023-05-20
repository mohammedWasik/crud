import express from "express";
import { userModel } from "../mongodb/models/userModel.js";

import * as dotenv from "dotenv";

dotenv.config();
const router = express.Router();

//  /add router
router
  .get("/add", async (req, res) => {
    res.status(200).json("get /add");
  })
  .post("/add", async (req, res) => {
    try {
      const { name, userName, email, phone } = req.body;

      const newUser = await userModel.create({
        name,
        userName,
        email,
        phone,
      });
      res.status(200).json({ success: true, data: newUser });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error?.message,
      });
    }
  });

//  /all router
router.get("/all", async (req, res) => {
  try {
    const Users = await userModel.find({});
    res.status(200).json({ success: true, data: Users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});
// /:id
router
  .put("/:id", async (req, res) => {
    try {
      const { name, userName, email, phone } = req.body;
      const user = await userModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name,
            userName,
            email,
            phone,
          },
        }
      );
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error?.message,
      });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      // const id = req.params.id;
      const user = await userModel.findById({ _id: req.params.id });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error?.message,
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error?.message,
      });
    }
  });

export default router;
