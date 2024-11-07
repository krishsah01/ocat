/* eslint-disable sort-keys */
import Table from 'react-bootstrap/Table';
import React, { useEffect, useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const [ deletedId, setDeletedId ] = useState();
  const [ deleteResponse, setDeleteResponse ] = useState(null);
  // Initialize filter states
  const [ filters, setFilters ] = useState({
    id: ``,
    instrumentType: ``,
    score: ``,
    riskLevel: ``,
    catName: ``,
    catDateOfBirth: ``,
  });

  // Fetch assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await AssessmentService.getList();
        console.log(data);
        setAssessments(data || []); // Fallback to an empty array if data is undefined
      } catch (error) {
        console.error(`Failed to fetch assessments:`, error);
      }
    };
    fetchAssessments();
  }, [ deletedId ]);

  const handleDelete = async (id) => {
    const response = await AssessmentService.deleteAssessment(id);
    setDeleteResponse(response.message);
    setDeletedId(id);
  };

  // Handle filter changes
  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  // Define columns with filters
  const columnHelper = createColumnHelper();
  const columns = useMemo(() => [
    columnHelper.accessor(`id`, {
      header: `ID`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `equals`,
    }),
    columnHelper.accessor(`instrumentType`, {
      header: `Instrument Type`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `includes`,
    }),
    columnHelper.accessor(`score`, {
      header: `Score`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `equals`,
    }),
    columnHelper.accessor(`riskLevel`, {
      header: `Risk Level`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `includes`,
    }),
    columnHelper.accessor(`catName`, {
      header: `Cat Name`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `includes`,
    }),
    columnHelper.accessor(`catDateOfBirth`, {
      header: `Cat Date of Birth`,
      cell: info => info.getValue(),
      footer: info => info.column.id,
      filter: `equals`,
    }),
    columnHelper.display({
      id: `actions`,
      header: `Actions`,
      cell: info =>
        <button className={`delete`} onClick={() => handleDelete(info.row.original.id)}>Delete</button>,
    }),
  ], []);

  // Filter assessments based on user input
  const filteredAssessments = useMemo(() => assessments.filter((assessment) => Object.keys(filters).every((key) => {
    const filterValue = filters[key];
    if (!filterValue) { return true; } // Skip empty filters
    const cellValue = assessment[key];
    return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
  })), [ assessments, filters ]);

  // Create the table instance
  const table = useReactTable({
    data: filteredAssessments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          {/* Render filter input fields */}
          {table.getHeaderGroups().map(headerGroup =>
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* Add input for filtering except for the Actions column */}
                  {header.column.id !== `actions` &&
                    <input
                      type="text"
                      placeholder={`Filter by ${header.column.columnDef.header}`}
                      value={filters[header.column.id] || ``}
                      onChange={(e) =>
                        handleFilterChange(header.column.id, e.target.value)}
                    />}
                </th>)}
            </tr>)}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ?
            table.getRowModel().rows.map(row =>
              <tr key={row.id}>
                {row.getVisibleCells().map(cell =>
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>)}
              </tr>) :
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>}
        </tbody>
      </Table>
      {deleteResponse && <p>{deleteResponse}</p>}
    </div>
  );
};
