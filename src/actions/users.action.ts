"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/zsa/action";
import Error from "next/error";
import { ZSAError } from "zsa";

export const getUsers = action
    .timeout(1000)
	.handler(async () => {
        try{
            await new Promise((resolve) => setTimeout(resolve, 2000));
            let users = await prisma.user.findMany();

            return users;
        }catch{
            throw new ZSAError("TIMEOUT")
        }
	});
