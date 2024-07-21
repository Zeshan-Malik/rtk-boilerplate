import PropTypes from "prop-types";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import theme from "../../theme";
import DSACustomizedCheckbox from "./DSACheckBox";

function DTEnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headerCells,
    hideSorting
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  var fixOffset = 40;
  var processedColumns = [];
  return (
    <TableHead
      sx={{
        "& .MuiTableCell-root": {
          "&:last-child": {
            borderRight: "none",
          },
          color: theme.palette.primary.tableAndTab,
          fontSize: theme.fonts.small_heading,
          padding: props.isSetting ? "5px 1px 5px 16px" : props.dragRows ? "5px 1px 5px 26px" : "5px 1px 5px 2px",
          borderBottom: "0",
          width: headerCells.width,
        },
      }}
    >
      <TableRow>
        {!props.isSetting && (
          <TableCell
            sx={{
              position: "sticky",
              left: 0,
              background: "#ffffff !important",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DSACustomizedCheckbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
              sx={{
                svg: { fill: theme.palette.primary.yellow_dark },
              }}
            />
          </TableCell>
        )}

        {headerCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              position: headCell.fixed ? "sticky" : "initial",
              left: headCell.fixed
                ? () => {
                  if (!processedColumns.includes(headCell.label)) {
                    processedColumns.push(headCell.label);
                    var offset = `${fixOffset}px`;
                    fixOffset =
                      fixOffset +
                      Number.parseInt(headCell.minWidth.split("px")[0]);
                    return offset;
                  } else {
                    return (
                      fixOffset -
                      Number.parseInt(headCell.minWidth.split("px")[0])
                    );
                  }
                }
                : 0,
              background: "#ffffff !important",
              zIndex: 10,
            }}
          >
            {
              hideSorting ?
                (headCell.label) :
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
            }

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DTEnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default DTEnhancedTableHead;
