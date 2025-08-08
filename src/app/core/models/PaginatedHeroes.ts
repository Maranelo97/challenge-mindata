import { Hero } from "./Hero";

export interface PaginatedHeroes {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: Hero[];
}