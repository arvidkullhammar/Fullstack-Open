const express = require("express");
const app = express();

app.use(express.json());

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const findPerson = (id) => {
  const person = phoneBook.find((person) => person.id === id);
  return person;
};

const generateId = () => Math.floor(Math.random() * 1000) + 1;

const checkName = (name) => phoneBook.find((person) => person.name === name);

app.get("/api/persons", (req, res) => {
  res.send(phoneBook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = findPerson(id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  console.group("request", req.body);
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "Name missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "Number missing",
    });
  }

  if (checkName(body.name)) {
    return res.status(409).json({
      error: "Name already exists",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phoneBook = phoneBook.concat(newPerson);

  res.json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBook = phoneBook.filter((person) => person.id !== id);
  console.log("persons", phoneBook);
  res.status(204).end();
});

app.get("/api/info", (req, res) => {
  const personsCount = phoneBook.length;
  const date = new Date();

  response = `<p>Phonebook has info on ${personsCount} people</p>
    <p>${date}</p>
`;

  res.send(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
