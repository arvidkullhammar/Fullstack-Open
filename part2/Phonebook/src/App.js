import { useState, useEffect } from "react";
import Inputfield from "./Components/Inputfield";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (e) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (!confirmDelete) {
      return;
    }
    const id = e;
    if (!persons.some((person) => person.id === id)) {
      alert(`Person with id ${id} is already deleted`);
      return;
    } else {
      personService.remove(id).then((res) => {
        const newPersons = [...persons];
        const filteredPersons = newPersons.filter((person) => person.id !== id);
        setPersons(filteredPersons);
      });
    }
  };

  const addPerson = (e) => {
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      const confirmUpdate = window.confirm(
        "Person already exists. Do you want to update the number?"
      );
      if (!confirmUpdate) {
        return;
      }

      personService
        .update({ ...existingPerson, number: newNumber })
        .then((updatedPerson) => {
          const updatedPersonIndex = persons.findIndex(
            (person) => person.id === updatedPerson.id
          );
          const updatedPersons = [...persons];
          updatedPersons[updatedPersonIndex] = updatedPerson;
          setPersons(updatedPersons);
          setNewName("");
          setNewNumber("");
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length ? persons[persons.length - 1].id + 1 : 0,
      };
      personService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLocaleLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Inputfield
        title={"Filter shown with"}
        value={filter}
        handleChange={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
