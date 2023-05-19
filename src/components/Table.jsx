import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({ rows, columns, setRows, idReq }) => {
	return (
		<Box sx={{ height: "64vh", width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				rowHeight={35}
				pageSize={10}
				rowsPerPageOptions={[10]}
				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
				columnVisibilityModel={{
					id: idReq,
				}}
				components={{
					Toolbar: GridToolbar,
				}}
				sx={{
					"& .MuiDataGrid-col#815B5Bers ": {
						backgroundColor: "$secondary-color",
						color: "#f9f7f7",
					},
				}}
				// componentsProps={{
				// 	toolbar: { setRows },
				// }}
			/>
		</Box>
	);
};

export default Table;
