const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const connectToDatabase = async () => {
       try {
              await prisma.$connect();
              console.log("Connected to the database successfully");
       } catch (error) {
              console.error("Error connecting to the database:", error);
              process.exit(1);
       }
}

module.exports = {
       prisma,
       connectToDatabase
};