import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
// import { Table } from "@aws-amplify/ui-react";
const TableBody = ({ list, header }) => (
  <tbody>
    {list.map((item, index) => (
      <TableRow {...{ item, index, header }} />
    ))}
  </tbody>
);
const TableHeader = ({ list, children }) => {
  const [firstItem] = list;
  const header = Object.keys(firstItem);
  console.log({ header });
  console.log({ firstItem });

  return (
    <>
      <thead>
        <tr>
          <th>#</th>
          {header.map((i) => (
            <th>
              <span>{i}</span>
            </th>
          ))}
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      {children}
    </>
  );
};
const TableCol = ({ item, index, i, header }) => {
  const currentItem = item[i];
  const [state, setState] = useState("");
  useEffect(() => {
    const isArr = Array.isArray(currentItem);
    const objOrUnd = typeof currentItem === ("object" || "undefined");

    if (!objOrUnd) {
      if (isArr === false) {
        setState("1");
      }
    } else if (isArr) {
      setState("2");
    } else {
      setState("3");
    }
  },[currentItem, item]);
  return (
    <>
      {state === "1" && <td>{currentItem}</td>}
      {state === "2" && (
        <td>
          <ResultTable list={currentItem} />
        </td>
      )}
      {state === "3" && <td> - </td>}
    </>
  );
};
const TableRow = ({ item, index, header }) => {
  // console.log({item});
  return (
    <tr>
      {header.map((i) => (
        <TableCol {...{ item, index, i, header }} />
      ))}
    </tr>
  );
};

const ResultTable = ({ list }) => {
  return (
    <Table striped="columns" responsive="sm">
      <Table striped bordered hover>
        <TableHeader {...{ list }}>
          {({ header }) => {
            console.log({ header });
            return <TableBody {...{ list, header }} />;
          }}
        </TableHeader>
      </Table>
    </Table>
  );
};
const Results = ({ list }) => {
  return (
    <Container fluid>
      <Table striped bordered hover>
        <TableHeader {...{ list }}>
          <>
          {({ header }) => {
            console.log({ header });
            return <TableBody {...{ list, header }} />;
          }}
          </>
        </TableHeader>
      </Table>
    </Container>
  );
};

export default Results;
