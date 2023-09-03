const Inputfield = ({ callback }) => (
  <>
    Find countries
    <input onChange={(e) => callback(e.target.value)}></input>
  </>
);

export default Inputfield;
