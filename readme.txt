Code will take arguments and input them into a database designed for an author and books.


//////////////////////////////////////////////////////////
                FUNCTIONALITY TO ADD

IMPROVE UPDATE BOOK FUNCTIONALITY - adding price, genre

ADD READ BOOKS BY AUTHOR FUNCTION

DEEPER READING INTO FOREIGN KEY RELATIONSHIPS

POSSIBLY CHANGE id ON AUTHOR TO THE OTHER METHOD

//////////////////////////////////////////////////////////
                    CRUD OPERATIONS


#CREATE BOOK

npm start -- --addBook --title "Ham on Rye" --price "8.99" --genre "Semi-Autobiographical" 

#CREATE AUTHOR

npm start -- --addAuthor --name  "Charles Bukowski" -bookId

#READ AUTHORs

npm start -- --listAuthors 

#UPDATE AUTHOR 

npm start -- --updateAuthor --name "Charles Bukowski" --newName "Kentaro Miura"

#UPDATE BOOK -flesh out, add price and genre parameters          

npm start -- updateBook --title "Ham on Rye" --newTitle "Beserk"

#DELETE AUTHOR

npm start -- --deleteAuthor --name "Charles Bukowski"

#DELETE BOOK

npm start -- --deleteBook --title "Ham on Rye"

















 npm start -- --delete --title "film title"


 const Film = require('../model/filmmodel');
const Actor = require('../model/actormodel')

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;


//CREATE
exports.addFilm = async(filmObj) =>{
    try {
                await Film.create(filmObj);
                console.log('Your film has successfully been added to the database.');

                //sync command
                // Film.create(filmObj);
                // Actor.create(actorObj);

                // await Film.sync({alter: true});
                // await Actor.sync({alter: true});


                // const Film =  await Film.create({ filmObj });
                // const actor = await Film.createActor({ actorObj });
    } catch (error) {
        console.log(error)
    } 
}

exports.addActor = async(actorObj) =>  {
    try {
        await Actor.create(actorObj);
        console.log("Your actor has successfully been added to the database.");
    } catch (error) {
        console.log(error);
    }
};


//READ 
exports.listFilm = async() => {
    try {
        const listOfFilms = await Film.findAll({
            raw: true,
            attributes: ["title"]
        });
        console.log(listOfFilms)
    } catch (error) {
        console.log(error)
    }
}

exports.listActor = async() => {
    try {
        const listOfActors = await Actor.findAll({
            raw: true,
            attributes: ["actorName"]
        });
        console.log(listOfActors)
    } catch (error) {
        console.log(error)
    }
}



//UPDATE
exports.updateFilm = async() => {
    try {
        if (argv.newname) {
            await Film.update(
                {name: argv.newname},
                {where: {name:argv.name}}
            )
            console.log(`The movie ${argv.name} has been changed to ${argv.newname}`)
    } else if (argv.newactor) {
        await Film.update (
            { actor: argv.newactor},
            {where: {name:argv.name}}
        )
        console.log(`The movie ${argv.name} actor has been changed to ${argv.newactor}`)
        }
    } catch (error) {
    console.log(error) 
    }
}


//DELETE
exports.deleteFilm = async() => {
    try {
        if (argv.title) {
            await Film.destroy({
                where:{title:argv.title}
            })
            console.log('Your film has been deleted from the database.');
        }
    } catch (error) {
        console.log(error);
    }
}