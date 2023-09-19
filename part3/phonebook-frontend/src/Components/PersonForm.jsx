import Inputfield from "./Inputfield";

const PersonForm = ({
  handleSubmit,
  handleNameChange,
  newName,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <div>
        <Inputfield
          title={"Name"}
          value={newName}
          handleChange={handleNameChange}
        />
        <Inputfield
          title={"Number"}
          value={newNumber}
          handleChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
