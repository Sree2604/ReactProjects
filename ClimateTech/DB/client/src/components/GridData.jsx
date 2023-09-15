// import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Icon from "react-crud-icons";

const GridData=({data,onDelete})=> {
  const navigate=useNavigate();

  const columns = [
    {
      field: 'location',
      headerName: 'Location',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      headerBorder: 'green',
      width: 150,
      editable: false,
    },
    {
      field: 'component',
      headerName: 'Component',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 120,
      editable: false,
    },
    {
      field: 'component_type',
      headerName: 'Component Type',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 163,
      editable: false,
    },
    {
        field: 'reuse',
        headerName: 'Reuse',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        width: 195,
        editable:true,
        height: 1000,
      },
    {
        field: 'recycle',
        headerName: 'Recycle',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        width: 195,
        editable: false,
      },
      {
        field: 'reduce',
        headerName: 'Reduce',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      // {
      //   field: 'link',
      //   headerName: 'Link',
      //   headerClassName: 'super-app-theme--header',
      //   headerAlign: 'center',
      //   renderCell: (params) => {
            
      //       <Link href={params.value}>
      //         {params.value}
      //       </Link>
      //   },
      //   width: 160,
      //   editable: true,
      // },
      {
        field: "Update",
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
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
            <ion-icon size="large"name="create-outline"
            onClick={() => {
                  sessionStorage.setItem(
                    "update_main",
                    JSON.stringify({ id, location, component, component_type, rid,reuse,reduce,recycle,link,res_id })
                  );
                  navigate("/update");
                }}
            ></ion-icon>
          );
        },
        headerName: "Update",
        fontWeight:'bold',
        width: 98,
        editable: false,
      },
      {
        field: "Delete",
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        renderCell: (params) => {
          const rowData = params.row;
          const componentType = rowData.component_type;
          
          return (
            <ion-icon size="large" name="close-circle-outline" 
            onClick={() => {
              onDelete(componentType)
            }}
            ></ion-icon>
          );
        },
        headerName: "Delete",
        width: 98,
        editable: false,
      },
  ];
  console.log(data);
  return (
    <Box sx={{  
      width: '100%', 
      }}>

      <div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        
        sx={{
          boxShadow: 10,
          borderTopColor:'green',
          letterSpacing:1,
          '& .MuiDataGrid-cell': {
            justifyContent:"center",
            fontFamily: 'Lato',
            fontWeight:'bold',
            backgroundColor:'white',
            fontSize: 15.5, 
            borderTop:'1px solid green',
          },

          '& .MuiDataGrid-columnHeader': {
            fontWeight:15,
          },
          overflow: 'auto', 
          '& .super-app-theme--header': {
            fontFamily: 'Lato',
            fontWeight:'bold',
            backgroundColor:'rgb(22 163 75)',
            border:'0.25px solid white',
            color:'white',
            borderBottom : '1px solid green',
            fontSize: 15.5, 
          },
         
        }}
        disableRowSelectionOnClick
      />
      </div>
    </Box>
  );
}
export default GridData;
