import { createFactory } from "hono/factory";
import db from "../db/db";
import { customers } from "../db/schema/customers";
import { ulid } from "ulid";
import { eq } from "drizzle-orm";

const factory = createFactory();

export const getCustomers = factory.createHandlers(async (c) => {
  console.log("getting all ledgers...");
  const read = await db.select().from(customers);
  if (read.length === 0) return c.json({ error: "No customers found" }, 404);
  return c.json(read);
});

export const getCustomerById = factory.createHandlers(async (c) => {
  const customerID = c.req.param("id");

  if (!customerID) {
    return c.json({ error: "Customer ID is required" }, 400);
  }

  const result = await db
    .select()
    .from(customers)
    .where(eq(customers.id, customerID));
  if (result.length === 0) return c.json({ error: "Customer not found" }, 404);
  return c.json(result[0]); //return single customer found
});

export const createCustomer = factory.createHandlers(async (c) => {
  const new_customerId = ulid();
  const body = await c.req.json();

  try {
    const [newCustomer] = await db
      .insert(customers)
      .values({
        id: new_customerId,
        name: body.name,
        phone: body.phone,
        email: body.email,
      })
      .returning();

    return c.json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    return c.json({ error: "Failed to create customer" }, 500);
  }
});

export const updateCustomer = factory.createHandlers(async (c) => {
  const customerId = c.req.param("id");

  if (!customerId) return c.json({ error: "Customer ID is required" }, 400);
  const body = await c.req.json();
  const updatedCustomer = await db
    .update(customers)
    .set({ name: body.name, phone: body.phone, email: body.email })
    .where(eq(customers.id, customerId))
    .returning();

  if (updatedCustomer.length === 0)
    return c.json({ error: "Customer not found" }, 404);
  return c.json(updatedCustomer[0]);
});

export const deleteCustomer = factory.createHandlers(async (c) => {
  const customerId = c.req.param("id");
  if (!customerId) return c.json({ error: "Customer ID is required" }, 400);

  const deletedCustomer = await db
    .delete(customers)
    .where(eq(customers.id, customerId))
    .returning();

  if (deletedCustomer.length === 0)
    return c.json({ error: "Customer not found" }, 404);
  return c.json(deletedCustomer[0]);
});
