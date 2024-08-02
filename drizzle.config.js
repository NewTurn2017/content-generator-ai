/* eslint-disable import/no-anonymous-default-export */
/** @type { import("drizzle-kit").Config } */

// Start Generation Here
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default {
  schema: './utils/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
}
