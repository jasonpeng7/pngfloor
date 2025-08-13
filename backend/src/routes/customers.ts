import { Hono } from "hono";
import db from "../db/db";
import { customers } from "../db/schema/customers";
import { eq } from "drizzle-orm";

const customersRouter = new Hono();

// fetch all customers
customersRouter.get("/", async (c) => {
  try {
    const allCustomers = await db.select().from(customers);
    return c.json(allCustomers);
  } catch (error) {
    return c.json({ error: "Failed to fetch customers" }, 500);
  }
});

// fetch customer by id
customersRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const customer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id));
    if (customer.length === 0) {
      return c.json({ error: "Customer not found" }, 404);
    }
    return c.json(customer[0]);
  } catch (error) {
    return c.json({ error: "Failed to fetch customer" }, 500);
  }
});

// create new customer
customersRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const newCustomer = await db.insert(customers).values(body).returning();
    return c.json(newCustomer[0]);
  } catch (error) {
    return c.json({ error: "Failed to create customer" }, 500);
  }
});

// update customer
customersRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedCustomer = await db
      .update(customers)
      .set(body)
      .where(eq(customers.id, id))
      .returning();
    if (updatedCustomer.length === 0) {
      return c.json({ error: "Customer not found" }, 404);
    }
    return c.json(updatedCustomer[0]);
  } catch (error) {
    return c.json({ error: "Failed to update customer" }, 500);
  }
});

// delete customer
customersRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deletedCustomer = await db
      .delete(customers)
      .where(eq(customers.id, id))
      .returning();
    if (deletedCustomer.length === 0) {
      return c.json({ error: "Customer not found" }, 404);
    }
    return c.json(deletedCustomer[0]);
  } catch (error) {
    return c.json({ error: "Failed to delete customer" }, 500);
  }
});

export default customersRouter;
