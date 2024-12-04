import express from "express";
import path from "path";

const staticFilesMiddleware = express.static(
  path.join(__dirname, "../uploads")
);

export default staticFilesMiddleware;
