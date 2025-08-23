import Button from "react-bootstrap/Button";

function ResetComponent({ resetData }) {
  return (
    <>
      <Button onClick={() => resetData()}>Reset ↻</Button>
    </>
  );
}

export default ResetComponent;
