/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from "next/types";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { ApiMethod } from "@/decorators/method";

import { IUser } from "@/types/user.d";

export default ApiMethod("GET")(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const users: Array<IUser> = Array.from({ length: 5 }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        id: faker.number.int(),
        name: `${firstName} ${lastName}`,
        email: faker.internet
          .email({ firstName, lastName })
          .toLocaleLowerCase(),
      };
    });

    return res.status(200).json(users);
  }
);
