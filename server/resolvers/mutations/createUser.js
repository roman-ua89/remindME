import {prisma} from "../../resolvers.js";

export const createUser = async (_, { email, password }) => {
  return await prisma.users.create({
    data: { email, password },
  });
}