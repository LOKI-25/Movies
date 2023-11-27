import { createContext } from "react";

export default createContext({
  movie: "",
  price: 0,
  total_seats: 0,
  available_seats: [],
  reserved_seats: [],
});
