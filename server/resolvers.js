// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client
import { PrismaClient } from "./generated/prisma/client.js";
import {getLatestId, isTagUnique, removeTag} from "./utils/utils.js";
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
    getUser: async (_, { id }) => {
      await prisma.users.findUnique({ // return?
        where: { id: Number(id) },
      });
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
    },
    createUser: async (_, { email, password }) => {
      return await prisma.users.create({
        data: { email, password },
      });
    },
    updateTags: async (_, { id, tag, tagAction }) => {
      let resultArr = [];
      const { tags: savedTags } = await prisma.users.findUnique({
        where: { id: parseInt(id) },
        select: {
          tags: true
        }
      });

      switch(tagAction) {
        case 'delete':
          const serializedArr = JSON.parse(savedTags);
          const filteredArr = removeTag({ originalArr: serializedArr, tag });
          resultArr = [...filteredArr];
          break;

        case 'update':
          if (!savedTags) {
            resultArr.push({ id: 1, title: tag });
          } else {
            const serializedArr = JSON.parse(savedTags);
            if (isTagUnique({ originalArr: serializedArr, newTag: tag })) {
              const latestId = getLatestId(serializedArr);
              resultArr = [...serializedArr, { id: latestId + 1, title: tag }];
            } else {
              // this scenario cna be handled on FE
              resultArr = [...serializedArr];
            }
          }
          break;

        default:
          throw new Error('Invalid tagAction');
      }

      return prisma.users.update({
        where: { id: parseInt(id) },
        data: {
          tags: resultArr.length ? JSON.stringify(resultArr) : '',
        }
      })
    },
    updateUser: async (_, { id, password, name, totalScore }) => {

    },
    deleteUser: async (_, { id }) => {
      await prisma.users.delete({
        where: { id: Number(id) },
      });
      return true;
    },
  },
}
