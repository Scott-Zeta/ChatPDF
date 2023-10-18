//drizzle configuration and tell where is the schema
//drizzle will read this file in root directory

import { Config } from 'drizzle-kit';
//dot env helper
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default {
  driver: 'pg', //which kind of database is going to interact with
  schema: 'src/lib/db/schema.ts', //where is the schema
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
    //however, the .env can only be accessed by file under /src, so need other library to help
    //! means it is not null
  },
} satisfies Config;

// drizzle-kit push:pg
//to push the schema to DB if all configs are correct

/*
change tsconfig.json 
"compilerOptions": {
    "target": "es5",
    ...
}
tp "esNext", "es6" if there is ERROR: Transforming const to the configured target environment ("es5") is not supported yet.
TypeScript complier problem
*/

/* 
$npx install pg
$npx drizzle-kit studio
To check if it is as expected
*/
