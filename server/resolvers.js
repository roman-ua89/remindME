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
    },
    singleNoteById: async (_root, { id }) => {
      return prisma.singleNote.findUnique({
        where: {
          id: parseInt(id)
        }
      })
    },
    listNoteById: async (_root, { id }) => {
      return prisma.listNote.findUnique({
        where: {
          id: parseInt(id)
        }
      })
    },
    listNotes: async () => {
      return prisma.listNote.findMany()
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
    updateSingleNote: async (_, { id, term, explanation }) => {
      const result = await prisma.singleNote.update({
        where: {
          id: parseInt(id)
        },
        data: {
          term,
          explanation
        }
      })
      return result;
    },
    createListNote: async (_, { title, serializedObject }) => {
      const result = await prisma.listNote.create({
        data: {
          title,
          serializedObject
        }
      });

      return result;
    },
    updateListNoteTitle: async (_, { id, title }) => {
      const result = await prisma.listNote.update({
        where: {
          id: parseInt(id)
        },
        data: {
          title
        }
      })
      return result;
    }
  },
}
