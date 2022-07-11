import React from "react";

const AdminFeedbacks = () => {
  return <div>AdminFeedbacks</div>;
};

export default AdminFeedbacks;

// import React from 'react';
// import { alpha, styled } from '@mui/material/styles';
// import { DataGrid, gridClasses } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import './styles/admin-feedbacks.scss';
// const ODD_OPACITY = 0.2;

// const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
//   [`& .${gridClasses.row}.even`]: {
//     backgroundColor: theme.palette.grey[200],
//     '&:hover, &.Mui-hovered': {
//       backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
//       '@media (hover: none)': {
//         backgroundColor: 'transparent',
//       },
//     },
//     '&.Mui-selected': {
//       backgroundColor: alpha(
//         theme.palette.primary.main,
//         ODD_OPACITY + theme.palette.action.selectedOpacity
//       ),
//       '&:hover, &.Mui-hovered': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           ODD_OPACITY +
//             theme.palette.action.selectedOpacity +
//             theme.palette.action.hoverOpacity
//         ),
//         // Reset on touch devices, it doesn't add specificity
//         '@media (hover: none)': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             ODD_OPACITY + theme.palette.action.selectedOpacity
//           ),
//         },
//       },
//     },
//   },
// }));

// const AdminFeedbacks = () => {
//   const { data, loading } = useDemoData({
//     dataSet: 'Employee',
//     rowLength: 150,
//   });

//   return (
//     // <div className="adminproduct-table">
//     <StripedDataGrid
//       loading={loading}
//       {...data}
//       getRowClassName={(params) =>
//         params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
//       }
//     />
//   );
// };
// export default AdminFeedbacks;
