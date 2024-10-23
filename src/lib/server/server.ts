import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Lien entre les variables d'environnement et leur type
export const env = createEnv({
    server: {
        DATABASE_URL: z.string(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        NEXTAUTH_SECRET: z.string(),
        NODE_ENV: z.string(),
        NEXTAUTH_URL: z.string().url(),
        EMAIL_SERVER: z.string(),
        EMAIL_FROM: z.string().email(),
    },
    runtimeEnv:{
        DATABASE_URL: process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        EMAIL_SERVER: process.env.EMAIL_SERVER,
        EMAIL_FROM: process.env.EMAIL_FROM,
    }
})