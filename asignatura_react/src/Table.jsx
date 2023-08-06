import { DataGrid } from "@mui/x-data-grid";


let pulse = null;
let rows = [];
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
  { field: "col7", headerName: "Id Profesor", width: 150 },
  { field: "col8", headerName: "Id Grado", width: 150 },
];

export function idmarcado() {
  return pulse;
}



export function writeRows() {
  fetch("http://localhost:8080/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
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

      for (let i = 0; i < data.length; i = i + 1) {
        const persona = {};

        for (let j = 0; j < data[i].length; j = j + 1) {
          persona[propiedades[j]] = data[i][j];
        }

        rows[i] = persona;
        
      }
    })
    .catch((error) => {
      // Manejar errores
    });
}

export const Table = () => {

  const handleCellClick = (params, event) => {
    console.log("Celda pulsada en fila:", params.row.id);

    if (pulse === params.row.id) {
      pulse = null;
    } else {
      pulse = params.row.id;
    }
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      disableMultipleSelection
      onCellClick={handleCellClick}
    />
  );
};
