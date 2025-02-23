import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRows } from "./actions";

let pulse = null;


const columns = [
  {
    field: "id",
    headerName: "ID",
    hide: true,
  },

  { field: "col2", headerName: "Nombre", width: 150 },
  { field: "col3", headerName: "Creditos", width: 150 },
  { field: "col4", headerName: "Tipo", width: 150 },
  { field: "col5", headerName: "Curso", width: 150 },
  { field: "col6", headerName: "Cuatrimestre", width: 150 },
  { field: "col7", headerName: "Profesor", width: 150 },
  { field: "col8", headerName: "Grado", width: 150 },
];

export function idmarcado() {
  return pulse;
}

export const writeRows = async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8080/");
    const data = await response.json();

    
    const propiedades = [
      "id",
      "col2",
      "col3",
      "col4",
      "col5",
      "col6",
      "col7",
      "col8",
    ];

    const updatedRows = data.map((rowData) => {
      const persona = {};
      for (let j = 0; j < rowData.length; j++) {
        persona[propiedades[j]] = rowData[j];
      }
      return persona;
    });

    dispatch(updateRows(updatedRows));
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

export const Table = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.rows);

  const handleCellClick = (params, event) => {
    if (pulse === params.row.id) {
      pulse = null;
    } else {
      pulse = params.row.id;
    }
  };

  useEffect(() => {
    writeRows(dispatch);
  }, [dispatch, rows]);

  return (
    <div className="table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableMultipleSelection
        onCellClick={handleCellClick}
        pageSize={8} // Muestra 50 filas por página
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
      />
    </div>
  );
};
