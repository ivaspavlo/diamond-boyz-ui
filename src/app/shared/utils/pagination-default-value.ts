import {IPagination} from "@app/interfaces";

export const PaginationDefaultValue = (): IPagination<any> => ({
  count: 0,
  next: "",
  prev: "",
  results: []
})
