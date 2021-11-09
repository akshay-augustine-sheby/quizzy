import React, { useMemo, useState } from "react";

import { Edit, Delete } from "@bigbinary/neeto-icons";
import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

const Table = ({ quizzes, deleteQuiz, editQuiz, showQuiz }) => {
  const [showModalExtraSmall, setShowModalExtraSmall] = useState(false);
  const [val, setVal] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "name", // accessor is the "key" in the data
        Cell: props => (
          <div onClick={() => showQuiz(props.cell.row.values.slug)}>
            {props.cell.row.values.name}
          </div>
        ),
      },
      {
        Header: "",
        accessor: "slug",
        Cell: ({ value }) => (
          <div className="space-x-1 px-1 py-2">
            <Button
              onClick={() => editQuiz(value)}
              style="secondary"
              label="Edit"
              iconPosition="left"
              icon={Edit}
            />
            <Button
              onClick={() => {
                setShowModalExtraSmall(true);
                setVal(value);
              }}
              style="secondary"
              label="Delete"
              iconPosition="left"
              icon={Delete}
            />
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
    <div className="">
      <table
        {...getTableProps()}
        className="border border-collapse w-full border-black"
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-black"
            >
              {headerGroup.headers.map(column => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="border w-3/4 bg-gray-400 border-gray-400"
                >
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
              <tr
                key={row.id}
                {...row.getRowProps()}
                className="border border-gray-400"
              >
                {row.cells.map(cell => {
                  return (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className="border px-3 border-gray-400 font-medium cursor-pointer"
                    >
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
