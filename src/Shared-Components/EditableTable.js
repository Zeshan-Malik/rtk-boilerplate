import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const EditableTable = ({ tableRows, headerCells, hideFooterPagination, hideFooter, onRowClick, disableColumnMenu, handleEditCell, layoutHeight, layoutWidth, handleValidationMessages }) => {
 
  const getChangedKey =(obj1, obj2) => {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return key;
      }
    }
  
    return false;
  }

  const processRowUpdate = (updatedRow, originalRow) => {
    {
      let changedKey = getChangedKey(updatedRow,originalRow)
      if(changedKey ==='height' || changedKey ==='topMargin' ){
        if(updatedRow.height+ Number(updatedRow.topMargin) <= layoutHeight){
          handleEditCell(updatedRow)
          return {
            ...updatedRow,
          }
        }else{
          let difference = layoutHeight- (originalRow.height+ Number(originalRow.topMargin))
          handleValidationMessages(changedKey, difference )
          return originalRow
        }
      } else   if(changedKey ==='width' || changedKey ==='leftMargin'){
        if(updatedRow.width+ Number(updatedRow.leftMargin) <= layoutWidth){
          handleEditCell(updatedRow)
          return {
            ...updatedRow,
          }
        }else{
          let difference = layoutHeight- (originalRow.height+ Number(originalRow.topMargin))
          handleValidationMessages(changedKey, difference )
          return originalRow
        }
      }
    }
  }

  return (
    <>
      <div style={{ height: "fit-content" }}>
        <DataGrid
          sx={{
            border: '0px'
          }}
          rows={tableRows}
          columns={headerCells}
          hideFooterPagination={hideFooterPagination}
          hideFooter={hideFooter}
          processRowUpdate={processRowUpdate}
          onRowClick={onRowClick}
          disableColumnMenu={disableColumnMenu}
        />
      </div>
    </>
  );
}

export default EditableTable;
