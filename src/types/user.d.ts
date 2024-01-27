import { NextApiRequest } from "next/types";
import { z } from "zod";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserCreate extends NextApiRequest {
  body: {
    name: string;
    email: string;
  };
}

export const userSchema = z.object({
  name: z.string().min(1, { message: "Nome é requirido" }),
  email: z.string().email({ message: "Endereço de email inválido" }),
});

export type TUserSchema = z.infer<typeof userSchema>;
