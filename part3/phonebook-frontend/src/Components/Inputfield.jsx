const Inputfield = ({ title, handleChange, value }) => {
  return (
    <p>
      {title}: <input value={value} onChange={(e) => handleChange(e)} />
    </p>
  );
};

export default Inputfield;
