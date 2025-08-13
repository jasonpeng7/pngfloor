import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customers-controllers";

import { Hono } from "hono";

const customersRouter = new Hono();

customersRouter.get("/", ...getCustomers);
customersRouter.get("/:id", ...getCustomerById);
customersRouter.post("/", ...createCustomer);
customersRouter.put("/:id", ...updateCustomer);
customersRouter.delete("/:id", ...deleteCustomer);

export default customersRouter;
