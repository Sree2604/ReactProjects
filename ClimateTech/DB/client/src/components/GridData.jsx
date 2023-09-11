import * as React from "react";
import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Alert from "@mui/material/Alert";

export default function ControlMasterDetail({ data,onDelete }) {
  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] =
    React.useState([]);
    const navigate = useNavigate();
  const handleDetailPanelExpandedRowIdsChange = React.useCallback((newIds) => {
    setDetailPanelExpandedRowIds(newIds);
  }, []);


  const columns = [
    { field: "location", headerName: "Location", width: 200 },
    { field: "component", headerName: "Component" },
    { field: "component_type", headerName: "Component Type" },
    {
      field: 'link',
      headerName: 'Link',
      renderCell: (params) => (
        <Link to={`${params.row.link}`}>{params.row.link}</Link>
      ),
      sortable: false,
      width: 160
    },
    {
      field: "Update",
      renderCell: (params) => {
        const rowData = params.row;
        const id = rowData.id;
        const res_id = rowData.res_id;
        const location = rowData.location;
        const component = rowData.component;
        const component_type = rowData.component_type;
        const rid = rowData.rid;
        const reuse = rowData.reuse;
        const reduce = rowData.reduce;
        const recycle = rowData.recycle;
        const link = rowData.link;
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sessionStorage.setItem(
                "update_main",
                JSON.stringify({ id, location, component, component_type, rid,reuse,reduce,recycle,link,res_id })
              );
              navigate("/update");
            }}
          >
            Update
          </Button>
        );
      },
      headerName: "Update",
      width: 160,
      editable: false,
    },
    {
      field: "Delete",
      renderCell: (params) => {
        const rowData = params.row;
        const id = rowData.id;

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onDelete(id)
            }}
          >
            Delete
          </Button>
        );
      },
      headerName: "Delete",
      width: 160,
      editable: false,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGridPro
          rows={data}
          columns={columns}
          rowThreshold={0}
          getDetailPanelContent={({ row }) => (
            <Box sx={{ p: 2 }}>
              <h1>Reuse</h1>
              {row.reuse.map((item) => (
                <li>{item}</li>
              ))}
              <h1>Reduce</h1>
              {row.reduce.map((item) => (
                <li>{item}</li>
              ))}
              <h1>Recycle</h1>
              {row.recycle.map((item) => (
                <li>{item}</li>
              ))}
            </Box>
          )}
          getDetailPanelHeight={() => 250}
          detailPanelExpandedRowIds={detailPanelExpandedRowIds}
          onDetailPanelExpandedRowIdsChange={
            handleDetailPanelExpandedRowIdsChange
          }
        />
      </Box>
    </Box>
  );
}



/* // import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


const GridData=({data})=> {
  const navigate=useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'location',
      headerName: 'Location',
      width: 150,
      editable: false,
    },
    {
      field: 'component',
      headerName: 'Component',
      width: 150,
      editable: false,
    },
    {
      field: 'component_type',
      headerName: 'Component_type',
      width: 160,
      editable: false,
    },
    {
        field: 'reuse',
        headerName: 'Reuse',
        width: 500,
        editable:true,
        height: 1000,
        renderCell:(params)=>{
            const rowData = params.row;
            const reuse = rowData.reuse;
            console.log(typeof(reuse));
            console.log(reuse);
            return(reuse.map((item)=>(<li>{item}</li>)))
        }
      },
    {
        field: 'recycle',
        headerName: 'Recycle',
        width: 160,
        editable: false,
      },
      {
        field: 'reduce',
        headerName: 'Reduce',
        width: 160,
        editable: false,
      },
  ];
  console.log(data);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
export default GridData; */
