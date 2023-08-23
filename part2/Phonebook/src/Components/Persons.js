const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(({ id, name, number }) => (
        <p key={id}>
          <label>
            {name} {number}
          </label>{" "}
          <button onClick={() => handleDelete(id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
