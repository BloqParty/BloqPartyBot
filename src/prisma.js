const { PrismaClient } = require("@prisma/client");

let prisma = undefined;
module.exports = {
    GetPrisma()
    {
        if (prisma === undefined)
            prisma = new PrismaClient();
        return prisma;
    }
}