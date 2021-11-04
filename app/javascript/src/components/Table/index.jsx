import React, { useMemo, useState } from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

const Table = ({ quizzes, deleteQuiz, editQuiz }) => {
  const [showModalExtraSmall, setShowModalExtraSmall] = useState(false);
  const [val, setVal] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz_name", // accessor is the "key" in the data
      },
      {
        Header: "",
        accessor: "slug",
        Cell: ({ value }) => (
          <div>
            <button onClick={() => editQuiz(value)}>Edit</button>
            <button
              onClick={() => {
                setShowModalExtraSmall(true);
                setVal(value);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => quizzes, []);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody key="" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={showModalExtraSmall}
        onClose={() => setShowModalExtraSmall(false)}
        size="xs"
      >
        <Modal.Header>
          <Typography style="h2">Delete Confirmation</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2" lineHeight="normal">
            Are you sure you want to delete?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            size="large"
            label="Delete"
            onClick={() => {
              setShowModalExtraSmall(false);
              deleteQuiz(val);
            }}
          />
          <Button
            style="text"
            size="large"
            label="Cancel"
            onClick={() => setShowModalExtraSmall(false)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Table;
