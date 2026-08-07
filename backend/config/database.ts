import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import env from "./env.js";

// const pool = new Pool({
//     connectionString: env.DATABASE_URL,
//     // Optional tuning
//     max: 10,                      // connectionLimit
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 5000,
// });
// const adapter = new PrismaPg(pool);
// const prisma = new PrismaClient({
//     adapter,
// });

// type DatabaseConfig = {
//   connectionString: string;
//   max?: number;
// };
// const createPrismaClient = (config: DatabaseConfig): PrismaClient => {
//     const pool = new Pool({
//         connectionString: config.connectionString,
//         max: config.max ?? 10,
//         idleTimeoutMillis: 30000,
//         connectionTimeoutMillis: 5000,
//     });

//     pool.connect().then((client) => {
//         console.log("PostgreSQL connected");
//         client.release();
//     }).catch((error) => {
//         console.error("PostgreSQL connection failed:", error.message);
//     });

//     return new PrismaClient({
//         adapter: new PrismaPg(pool),
//     });
// };
// const databases = {
//   primary: createPrismaClient({
//     connectionString: env.DATABASE_URL!,
//   }),

//   // Future databases
//   // analytics: createPrismaClient({
//   //   connectionString: process.env.ANALYTICS_DATABASE_URL!,
//   // }),

//   // audit: createPrismaClient({
//   //   connectionString: process.env.AUDIT_DATABASE_URL!,
//   // }),
// };
// export default databases;

export function getDatabase(db: keyof typeof clients = "db1"): PrismaClient {
    return clients[db];
}

const clients = {
  db1: createClient(env.DATABASE_URL),
  // Future Databases
  // db2: createClient(env.SECOND_DATABASE_URL),
  // db3: createClient(env.THIRD_DATABASE_URL),
} as const;

function createClient(connectionString: string): PrismaClient {
    const pool = new Pool({
        connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
    let dataBase = connectionString.split("/").pop()?.split("?")[0];
    
    pool.connect().then((client) => {
        console.log("PostgreSQL connected - ", dataBase);
        client.release();
    }).catch((error) => {
        console.error("PostgreSQL connection failed:", error.message);
    });

    return new PrismaClient({
        adapter: new PrismaPg(pool),
    });
}

export default clients;