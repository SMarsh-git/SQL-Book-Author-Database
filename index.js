const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const Author = require("./model/authormodel");
const Book = require("./model/bookmodel");
const {
  addAuthor,
  addBook,
  listAuthors,
  updateAuthor,
  updateBook,
  deleteAuthor,
  deleteBook,
} = require("./utils/methods");

(async () => {
  try {
    await Book.sync();
    await Author.sync();
    Book.hasMany(Author, {
      foreignKey: "bookId",
    });
    Author.belongsTo(Book, {
      foreignKey: "bookId",
    });

    if (argv.addAuthor) {
      await addAuthor({ name: argv.name, bookId: argv.bookId });
      console.log(`${argv.name} has been added to the database.`);
    } else if (argv.addBook) {
      await addBook({
        title: argv.title,
        price: argv.price,
        genre: argv.genre,
      });
      console.log(`${argv.title} has been added to the database.`);
    } else if (argv.listAuthors) {
      await listAuthors();
    } else if (argv.updateAuthor) {
      const authorFind = { name: argv.name };
      const authorReplace = { name: argv.newName };
      await updateAuthor(authorFind, authorReplace);
    } else if (argv.updateBook) {
      const bookFind = { title: argv.title };
      const bookReplace = { title: argv.newTitle };
      await updateBook(bookFind, bookReplace);
    } else if (argv.deleteAuthor) {
      const authorToDelete = { name: argv.name };
      await deleteAuthor(authorToDelete);
      console.log(`${argv.name} has been deleted from the database.`);
    } else if (argv.deleteBook) {
      const bookToDelete = { title: argv.title };
      await deleteBook(bookToDelete);
      console.log(`${argv.title} has been deleted from the database.`);
    } else {
      console.log("Please enter a valid input, such as:");
      console.log(
        "--addAuthor, --addBook, --listAuthors, --updateAuthor, --deleteAuthor."
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
