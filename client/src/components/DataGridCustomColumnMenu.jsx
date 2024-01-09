import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
  } from "@mui/x-data-grid";
  
  const CustomColumnMenu = (props) => {
    //passed implicitly or automatically by DataGrid
    const { hideMenu, currentColumn, open } = props;
    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        open={open}
      >
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
      </GridColumnMenuContainer>
    );
  };
  
  export default CustomColumnMenu;