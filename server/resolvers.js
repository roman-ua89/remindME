// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client
import { PrismaClient } from "./generated/prisma/client.js";
import * as sea from "node:sea";

export const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    messages: async () => {
      return prisma.message.findMany(); // Use Prisma to fetch messages
    },
    singleNotes: async () => {
      return prisma.singleNote.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 10
      })
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
      return prisma.listNote.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 10
      })
    },
    searchNotes: async (_, { searchTerm }) => {
      console.log('searchTerm', searchTerm)
      const singleNotes = await prisma.singleNote.findMany({
        where: {
          term: { contains: searchTerm }
        },
        take: 10
      });
      const listNotes = await prisma.listNote.findMany({
        where: {
          title: { contains: searchTerm }
        },
        take: 10
      });

      return { singleNotes, listNotes }
    },
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
    deleteSingleNoteById: async (_, {id}) => {
      await prisma.singleNote.delete({
        where: {
          id: parseInt(id)
        }
      })
      return prisma.singleNote.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 10
      })
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
    updateListNote: async (_, { id, serializedObject }) => {
      const result = prisma.listNote.update({
        where: {
          id: parseInt(id),
        },
        data: {
          serializedObject
        }
      })
      return result;
    },
    deleteListNoteById: async (_, { id }) => {
      await prisma.listNote.delete({
        where: {
          id: parseInt(id)
        }
      })
      return prisma.listNote.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 10
      })
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
