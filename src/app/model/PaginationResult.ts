import {City} from './City';

export interface PaginationResult {
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  list: City[];
}
