/* eslint-disable sort-keys */
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
  const [ deleteResponse, setDeleteResponse ] = useState(null);
  const [ deletedId, setDeletedId ] = useState(null);

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

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const response = await AssessmentService.deleteAssessment(id);
      setDeleteResponse(response.message);
      setDeletedId(id);
    } catch (error) {
      console.error(`Failed to delete assessment:`, error);
    }
  };

  // Define columns
  const columnHelper = createColumnHelper();
  const columns = useMemo(() => [
    columnHelper.accessor(`id`, {
      header: `ID`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`instrumentType`, {
      header: `Instrument Type`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`score`, {
      header: `Score`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`riskLevel`, {
      header: `Risk Level`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`catName`, {
      header: `Cat Name`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`catDateOfBirth`, {
      header: `Cat Date of Birth`,
      footer: info => info.column.id,
    }),
    columnHelper.accessor(`deletedAt`, {
      header: `Deleted At`,
      footer: info => info.column.id,
    }),

    columnHelper.display({
      id: `actions`,
      header: `Actions`,
      cell: info =>
        <button onClick={() => handleDelete(info.row.original.id)}>Delete</button>
      ,
    }),
  ], []);

  // Create the table instance
  const table = useReactTable({
    data: assessments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup =>
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                <th key={header.id}>
                  {header.isPlaceholder ?
                    null :
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
        <tfoot>
          {table.getFooterGroups().map(footerGroup =>
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header =>
                <th key={header.id}>
                  {header.isPlaceholder ?
                    null :
                    flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>)}
            </tr>)}
        </tfoot>
      </table>
    </div>
  );
};
