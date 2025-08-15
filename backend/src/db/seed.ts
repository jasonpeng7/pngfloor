import db from "./db";
import { customers } from "./schema/customers";
import { bookings } from "./schema/bookings";
import { ulid } from "ulid";

const main = async () => {
  console.log("seeding database...");

  // delete in correct order to respect foreign key constraints
  await db.delete(bookings);
  await db.delete(customers);

  const customer1Id = ulid();

  await db.insert(customers).values({
    id: customer1Id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "6281234567890",
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  });

  await db.insert(bookings).values({
    id: ulid(),
    customer_id: customer1Id,
    date: new Date(),
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    phone_number: "6281234567890",
    house_size: 2000,
    rooms: "2",
    service: "Free Estimate",
    message: "I would like to get an estimate for my home",
    status: "pending",
  });

  console.log("database seeded successfully");
};

main()
  .catch((err) => {
    console.error("error seeding database", err);
    process.exit(1);
  })
  //   gaurantee script will terminate when done since drizzle sometimes keeps db connections open in background

  .finally(() => {
    process.exit(0);
  });
