// @types/multer.d.ts
import { RequestHandler } from "express";
import * as multer from "multer";

declare module "multer" {
  export interface Multer {
    single(fieldname: string): RequestHandler;
  }
}
