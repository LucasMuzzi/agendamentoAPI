// @types/multer.d.ts
import { RequestHandler } from "express";

declare module "multer" {
  export interface Multer {
    single(fieldname: string): RequestHandler;
  }
}
