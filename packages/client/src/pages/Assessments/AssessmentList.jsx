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
  const [ deleteResponse, setDeleteResponse ] = useState();
  const [ deletedId, setDeletedId ] = useState();

  // Fetch assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      const data = await AssessmentService.getList();
      setAssessments(data);
    };
    fetchAssessments();
  }, [ deletedId ]);

  // Delete handler
  const handleDelete = async (id) => { // Removed type annotation
    const response = await AssessmentService.deleteAssessment(id);
    setDeleteResponse(response.message);
    setDeletedId(id);
  };

  // Define columns
  const columnHelper = createColumnHelper();
  const columns = useMemo(() => [
    columnHelper.accessor(`id`, {
      footer: info => info.column.id,
      header: `ID`,
    }),
    columnHelper.accessor(`catName`, {
      footer: info => info.column.id,
      header: `Cat Name`,
    }),
    columnHelper.accessor(`catDateOfBirth`, {
      footer: info => info.column.id,
      header: `Cat Date of Birth`,
    }),
    columnHelper.accessor(`score`, {
      footer: info => info.column.id,
      header: `Score`,
    }),
    columnHelper.accessor(`riskLevel`, {
      footer: info => info.column.id,
      header: `Risk Level`,
    }),
    columnHelper.accessor(`instrumentType`, {
      footer: info => info.column.id,
      header: `Instrument Type`,
    }),
    columnHelper.display({
      cell: info =>
        <button onClick={() => handleDelete(info.row.original.id)}>Delete</button>,
      header: `Actions`,
      id: `actions`,
    }),
  ], [ handleDelete ]);

  // Create the table instance
  const table = useReactTable({
    columns,
    data: assessments,
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
          {table.getRowModel().rows.map(row =>
            <tr key={row.id}>
              {row.getVisibleCells().map(cell =>
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>)}
            </tr>)}
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
