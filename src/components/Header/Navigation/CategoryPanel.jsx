import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse"


const CategoryPanel = (props) => {

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="categorypanel"
      onKeyDown={() => props.openCategoryPanel(false)}
    >
      <h3 className="!p-3 text-[16px] font-[500]  flex items-center justify-between">
        Shop By Categories{" "}
        <IoClose
          onClick={() => props.openCategoryPanel(false)}
          className="cursor-pointer text-20px"
        />
      </h3>
      {
  props?.data?.length !== 0 && 
  <CategoryCollapse catData={props?.data}/>
}



    </Box>
  );

  return (
    <Drawer
      open={props.isOpenCatPanel}
      onClose={() => props.openCategoryPanel(false)}
    >
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
