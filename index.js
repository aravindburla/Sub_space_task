// const express = require('express');
import express from "express";
// const axios = require('axios');
import router from "./routes.js";
// const _ = require('lodash');

const app = express();

app.use(express.json());
// Middleware to fetch blog data


app.use("/api", router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
