const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient();
module.exports = {
    GetPrisma()
    {
        if (prisma === undefined)
            prisma = new PrismaClient();
        return prisma;
    }
}