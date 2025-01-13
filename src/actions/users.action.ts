"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/action/action";
import Error from "next/error";

export const getUsers = actionClient