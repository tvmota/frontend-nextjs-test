/**
 * @api {post} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiResponse } from "next/types";
import { ZodError, ZodIssue } from "zod";
import { userSchema } from "@/types/user.d";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { ApiMethod } from "@/decorators/method";
import { IUser, IUserCreate } from "@/types/user.d";

const users: IUser[] = [];

const findUser = (newUserEmail: string) => {
  return users.find(({ email }) =>
    email.toLocaleLowerCase().includes(newUserEmail.toLocaleLowerCase())
  );
};

const handleError = (errors: ZodError) => {
  const { issues } = errors;
  const messages = issues.map((i: ZodIssue) => i.message);

  return { messages };
};

export default ApiMethod("POST")(
  async (req: IUserCreate, res: NextApiResponse) => {
    try {
      const result = userSchema.safeParse(req.body);
      if (result.success) {
        const hasUser = findUser(req.body.email);

        if (hasUser) {
          return res.status(400).json({ message: "o usuário já cadastrado" });
        }

        users.push({
          id: faker.number.int(),
          ...req.body,
        });
        return res
          .status(200)
          .json({ message: "usuário criado com sucesso", users });
      } else {
        return res.status(500).json(handleError(result.error));
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
