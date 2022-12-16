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
const TableHeader = ({ header }) => {
  return (
    <>
      <thead>
        <tr>
          {header.map((i) => {
            const isArr = Array.isArray(i);
            const notObj = typeof i !== "object";
            const notUndefined = typeof i !== "undefined";
            return <>{!!notUndefined && !!notObj && <th>{i}</th>}</>;
          })}
        </tr>
      </thead>
    </>
  );
};
const TableCol = ({ item, index, i, header }) => {
  const currentItem = item[i];
  // console.log({ currentItem });
  const isArr = Array.isArray(currentItem);
  const notObj = typeof currentItem !== "object";
  const notUndefined = typeof currentItem !== "undefined";

  return (
    <td>
      {notUndefined === false && <span> - </span>}
      {!!notUndefined && !!isArr && <SimpleTable list={currentItem} />}
      {!!notUndefined && !!notObj && <td>{currentItem}</td>}
    </td>
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

const SimpleTable = ({ list }) => {
  const [firstItem] = list;
  console.log("SimpleTable", { firstItem });
  const header = Object.keys(firstItem);
  return (
    <Table striped={"columns"} variant={"red"} className={"table-light"} responsive="sm">
      <TableHeader header={header} />
      <TableBody {...{ list, header }} />
    </Table>
  );
};
const Results = ({ list }) => {
  const [firstItem] = list;
  const header = Object.keys(firstItem);

  return (
    <Container fluid>
      <Table striped bordered hover responsive="lg">
        <TableHeader {...{ header }} />
        <TableBody {...{ list, header }} />
      </Table>
    </Container>
  );
};

export default Results;
