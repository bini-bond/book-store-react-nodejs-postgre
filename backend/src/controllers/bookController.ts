import { Request, Response } from "express";
import { bookRepository } from "../repositories/bookRepository";

export const bookController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10;

      const books = await bookRepository.getAllBooks(page, pageSize);

      res.status(200).json({data: books});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Add other book-related controller functions here
};
