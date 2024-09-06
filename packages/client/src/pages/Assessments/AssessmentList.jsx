import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      const data = await AssessmentService.getList();
      setAssessments(data);
    };
    fetchAssessments();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: `ID`,
        accessor: `id`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Cat Name`,
        accessor: `catName`,
      },
      {
        Header: `Cat Date of Birth`,
        accessor: `catDob`,
      },
      {
        Header: `Created At`,
        accessor: `createdAt`,
      },
    ]

  );
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data: assessments,
  });
  return (
    <div>
      <h2>Assessment List</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps()}>
                  {column.render(`Header`)}
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td {...cell.getCellProps()}>
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
