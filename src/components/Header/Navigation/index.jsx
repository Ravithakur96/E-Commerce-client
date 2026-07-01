import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "./style.css";
import { MyContext } from "../../../App";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    setCatData(context?.catData);
  }, [context?.catData]);

  const openCategoryPanel = (open) => {
    setIsOpenCatPanel(open);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={() => openCategoryPanel(true)}
            >
              <RiMenu2Fill className="text-[18px]" />
              Shop By Category
              <LiaAngleDownSolid className="text-[13px] !ml-auto font-bold" />
            </Button>
          </div>

          <div className="col_2 w-[60%]">
            <ul className="flex items-center !gap-3 nav">
              <li className="list-none">
                <Link to="/">
                  <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                    Home
                  </Button>
                </Link>
              </li>

              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={index}>
                      <Link to="/">
                        <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                          {cat?.name}
                        </Button>
                      </Link>

                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[150px]  bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  className="list-none w-full  relative"
                                  key={index_}
                                >
                                  <Link to="/" className="w-full">
                                    <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] w-full !text-left !justify-start !rounded-none">
                                      {subCat?.name}
                                    </Button>
                                  </Link>

                                  {subCat?.children?.length !== 0 && (
                                    <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                                      <ul>
                                        {subCat?.children?.map(
                                          (thirdLevelCat, index) => {
                                            return (
                                              <li className="list-none w-full">
                                                <Link
                                                  to="/"
                                                  className="w-full"
                                                  key={index}
                                                >
                                                  <Button className="!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] w-full !text-left !justify-start !rounded-none">
                                                    {thirdLevelCat?.name}
                                                  </Button>
                                                </Link>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="col_3 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <Link to="/">
                <Button className="link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]">
                  <GoRocket className="text-[18px]" /> Free International
                  Delivery
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel component */}
      {
        catData?.length!==0 &&
        <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
        data={catData}
      />

      }
      
    </>
  );
};

export default Navigation;
