// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client
import { PrismaClient } from "./generated/prisma/client.js";

export const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    messages: async () => {
      return prisma.message.findMany(); // Use Prisma to fetch messages
    },
    singleNotes: async () => {
      return prisma.singleNote.findMany()
    }
  },
  Mutation: {
    createMessage: async (_, { content, author }) => {
      const message = await prisma.message.create({
        data: {
          content,
          author,
        },
      });
      return message;
    },
    createSingleNote: async (_, { term, explanation }) => {
      const result = await prisma.singleNote.create({
        data: {
          term,
          explanation
        }
      })
      return result;
    },
    createListNote: async (_, { term, explanation }) => {}
  },
}
