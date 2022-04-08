const { argv } = require("yargs");
const Author = require("../model/authormodel");
const Book = require("../model/bookmodel");

//CREATE
exports.addAuthor = async (authorObj) => {
  try {
    await Author.create(authorObj);
  } catch (error) {
    console.log(error);
  }
};

exports.addBook = async (bookObj) => {
  try {
    await Book.create(bookObj);
  } catch (error) {
    console.log(error);
  }
};

//READ
exports.listAuthors = async () => {
  try {
    const list = await Author.findAll({
      raw: true,
      attributes: ["name"],
    });
    console.log("Database contains the following Authors:");
    console.log(list);
  } catch (error) {
    console.log(error);
  }
};

//UPDATE
exports.updateAuthor = async (authorFind, authorReplace) => {
  try {
    console.log(authorReplace, authorFind);
    await Author.update(authorReplace, { where: authorFind });
  } catch (error) {
    console.log(error);
  }
};

exports.updateBook = async (bookFind, bookReplace) => {
  try {
    console.log(bookReplace, bookFind);
    await Book.update(bookReplace, { where: bookFind });
  } catch (error) {
    console.log(error);
  }
};

//DELETE
exports.deleteAuthor = async (authorToDelete) => {
  try {
    await Author.destroy({ where: authorToDelete });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBook = async (bookToDelete) => {
  try {
    await Book.destroy({ where: bookToDelete });
  } catch (error) {
    console.log(error);
  }
};
