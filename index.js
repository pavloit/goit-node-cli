const { program } = require('commander')

const {
    listContacts,
    getContactById,
    removeContact,
    addContact, 
} = require("./src/constacts")

program
    .option("-a, --action <action>", "Action to invoke i.e. 'list' 'get' 'add' 'remove'")
    .option("-i, --id <id>", "user id")
    .option("-n, --name <name>", "user name")
    .option("-e, --email <email>", "user email")
    .option("-p, --phone <phone>", "user phone i.e (123) 456-7890");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            return contacts;
        case "get":
            const contact = await getContactById(id);
            return contact;
        case "add":
            const createContact = await addContact(name, email, phone)
            return createContact;
        case "remove":
            const removedContact = await removeContact(id);
            return removedContact;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options).then(console.log).catch(console.error)