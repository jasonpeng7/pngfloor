import { drizzle } from "drizzle-orm/node-postgres";
import * as genericSchema from "./schema/generic";
import { customers } from "./schema/customers";
import { bookings } from "./schema/bookings";
import { appEnv } from "../types/env";

const pg_ssl =
  appEnv.POSTGRES_SSL === "false" ? "disable" : appEnv.POSTGRES_SSL;

const connectionString = `postgresql://${appEnv.POSTGRES_USER}:${appEnv.POSTGRES_PASSWORD}@${appEnv.POSTGRES_HOST}:${appEnv.POSTGRES_PORT}/${appEnv.POSTGRES_DB}?sslmode=${pg_ssl}`;
const db = drizzle(connectionString, {
  schema: {
    ...genericSchema,
  },
});

export default db;
