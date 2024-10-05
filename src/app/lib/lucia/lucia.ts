import { Lucia, TimeSpan } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";

import { pool } from "../../api/contexts/kernel/infrastructure/kysely/nasa-db";

const adapter = new NodePostgresAdapter(pool, {
  user: "users",
  session: "sessions",
});

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    expires: false,
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}
