const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const timeout = setTimeout(() => {
    console.error("Script timed out");
    process.exit(1);
  }, 30000); // 30 seconds timeout

  try {
    // clean the database by deleting all records from the 'book' and 'author' tables
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    console.log("Database cleaned");

    // create two authors and store their references
    const author1 = await prisma.author.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        bio: "John Doe is a pseudonym for an anonymous person",
      },
    });

    const author2 = await prisma.author.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        bio: "Jane Smith is a pseudonym for an anonymous person",
      },
    });

    console.log("Authors created");

    // create two books and associate them with the created authors using their IDs
    const book1 = await prisma.book.create({
      data: {
        title: "Book 1",
        year: 2021,
        summary: "Summary of book 1",
        quantity: 10,
        genre: ["Fantasy"],
        authorId: author1.id, // link to author1
      },
    });

    const book2 = await prisma.book.create({
      data: {
        title: "Book 2",
        year: 2021,
        summary: "Summary of book 2",
        quantity: 5,
        genre: ["Science Fiction"],
        authorId: author2.id, // link to author2
      },
    });

    console.log("Books created");

    // console.log({ author1, author2, book1, book2 });
  } catch (error) {
    console.error(error);
  } finally {
    clearTimeout(timeout); // clear the timeout if the script completes in time
    await prisma.$disconnect();
  }
}

main();
console.log("Seeding completed");
module.exports = prisma;
