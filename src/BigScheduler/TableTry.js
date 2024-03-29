import React, { useMemo, useState } from "react";
import BodyView from "./BodyView";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ViewTypes } from "./helpers";
import UserAvatar from "../components/UserAvatar/UserAvatar";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from ".";
import { Popover } from "antd";
const editItemObject = [
  {
    label: "Edit",
    value: "edit"
  },
  { label: "Calendar Feed", value: "cal" },
  {
    label: "Archive",
    value: "arc"
  },
  {
    label: "Delete",
    value: "del"
  }
];
const TableTry = (props) => {
  const {
    schedulerData,
    toggleExpandFunc,
    dnd,
    openEditItemPopUp,
    closePopup
  } = props;
  //eslint-disable-next-line no-unused-vars
  const { renderData, cellUnit, config, headers } = schedulerData;
  const borderBottom = "1px solid #c4c4c4";
  let contentScrollbarHeight = 17,
    resourceScrollbarHeight = 17,
    contentHeight = config.schedulerContentHeight;
  let contentPaddingBottom =
    contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
  let schedulerContentStyle = {
    overflowX: config?.viewType === ViewTypes.Week ? "hidden" : "hidden",
    overflowY: "hidden",
    margin: 0,
    position: "relative",
    height: 50
    // paddingBottom: contentPaddingBottom
  };

  let editItems = editItemObject.map((item, index) => {
    return (
      <Box
        key={item?.value}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"start"}
        flexDirection={"column"}
        padding={"1rem"}
        borderBottom={index === 1 && "1px solid #ccc"}
        className={`cursor-pointer availabilitySelector`}
        width={"10rem"}
      >
        <Typography variant="p3" color={"#333"}>
          {item?.label}
        </Typography>
      </Box>
    );
  });
  let schedulerWidth = schedulerData.getContentTableWidth() - 1;
  let resourceTableWidth = schedulerData.getResourceTableWidth();
  const width = schedulerData.getSchedulerWidth();

  let schedulerContainerWidth =
    width - (config.resourceViewEnabled ? resourceTableWidth : 0);

  let expandItem = new Set();
  const getExpandButton = (item) => {
    return item.hasChildren && item.expanded ? (
      <KeyboardArrowUpIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
          expandItem.add(item?.slotName);
        }}
      />
    ) : (
      <KeyboardArrowDownIcon
        key={`es${item.indent}`}
        style={{}}
        className=""
        onClick={() => {
          if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
          expandItem.delete(item?.slotName);
        }}
      />
    );
  };
  const displayRenderData = renderData.filter((o) => o.render);
  const getDivs = () => {
    let eventDndSource = dnd.getDndSource();
    let DndResourceEvents = dnd.getDropTarget(config.dragAndDropEnabled);
    return displayRenderData.map((item, index) => {
      let resourceEventsList = (
        <DndResourceEvents
          {...props}
          key={item.slotId}
          resourceEvents={item}
          dndSource={eventDndSource}
        />
      );
      return (
        !item?.parentId && (
          <div
            style={{
              // marginTop: "0.1rem",
              marginBottom: expandItem?.size > 0 ? "1rem" : 0,
              maxWidth: "100vw",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                minHeight: "4.5rem",
                display: "flex",
                width: "fit-content",
                height: "4.7rem"
              }}
            >
              <div
                style={{ minWidth: "23.9rem", borderBottom: borderBottom }}
                className="bg-[#fff] stickyCell flex justify-center items-center w-full"
              >
                <UserAvatar username={item?.slotName} />
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-around"}
                >
                  <Typography variant="p1" color="black">
                    {item?.slotName?.split(" ")[0]}
                  </Typography>
                  <Box>{getExpandButton(item)}</Box>
                </Box>
              </div>
              {
                <tr
                  style={{
                    marginTop: "-0.25rem"
                  }}
                >
                  <td style={{ border: 0 }}>
                    <div
                      className="scheduler-view"
                      style={{
                        width: schedulerContainerWidth,
                        verticalAlign: "top"
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          ...schedulerContentStyle
                        }}
                        // style={schedulerContentStyle}
                        // ref={props.schedulerContentRef}
                        // onMouseOver={props.onSchedulerContentMouseOver}
                        // onMouseOut={props.onSchedulerContentMouseOut}
                        // onScroll={props.onSchedulerContentScroll}
                      >
                        <div style={{ width: schedulerWidth }}>
                          <div className="scheduler-content">
                            <table className="scheduler-content-table">
                              <tbody>{resourceEventsList}</tbody>
                            </table>
                          </div>
                          <div className="scheduler-bg">
                            <table
                              className="scheduler-bg-table"
                              style={{ width: schedulerWidth }}
                              // ref={props.schedulerContentBgTableRef}
                            >
                              <BodyView
                                {...props}
                                // scroller={this.bodyScroller}
                                scroller={() => {}}
                                currentItem={item}
                              />
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              }
            </div>
            {item?.expanded &&
              getInnerTable(
                displayRenderData,
                item?.slotId,
                eventDndSource,
                DndResourceEvents,
                item
              )}
          </div>
        )
      );
    });
  };
  const getInnerTable = (
    displayRenderData,
    slotid,
    eventDndSource,
    DndResourceEvents,
    item
  ) => {
    const filteredData = displayRenderData.filter(
      (item) => item?.parentId === slotid
    );
    const requiredHeaders = headers.map((header) => {
      return {
        ...header,
        addMore: 0,
        addMoreIndex: 0,
        count: 0,
        end: dayjs(header?.time).endOf("day").format(DATETIME_FORMAT),
        nonWorkingTime: false,
        start: header.time,
        events: []
      };
    });
    const dropDownItem = {
      expanded: false,
      hasChildren: false,
      hasSummary: false,
      headerItems: requiredHeaders,
      indent: 0,
      parentId: item?.slotId,
      render: true,
      rowheight: 68,
      rowMaxCount: 1,
      slotId: item?.slotId,
      slotName: null
    };
    let dropDownEventList = (
      <DndResourceEvents
        {...props}
        key={slotid}
        resourceEvents={dropDownItem}
        dndSource={eventDndSource}
      />
    );
    return (
      <>
        {filteredData.map((filteredItem) => {
          let resourceEventsList = (
            <DndResourceEvents
              {...props}
              key={filteredItem.slotId}
              resourceEvents={filteredItem}
              dndSource={eventDndSource}
            />
          );
          return (
            <div
              key={filteredItem?.slotId}
              style={{
                // maxWidth: "24rem",
                minWidth: "23.9rem",
                height: "4.7rem",
                display: "flex",
                width: "fit-content"
              }}
            >
              <div
                style={{ minWidth: "23.9rem", borderBottom: borderBottom }}
                className="bg-[#fff] stickyCell flex justify-end items-center px-4"
              >
                <Typography variant="c1" color="#666" paddingRight={"1rem"}>
                  {" "}
                  {filteredItem?.slotName}
                </Typography>
                <div
                  style={{
                    height: "90%",
                    border: "4px solid #FB7A24",
                    borderRadius: "8px"
                  }}
                />
              </div>
              {
                <tr>
                  <td>
                    <div
                      className="scheduler-view"
                      style={{
                        width: schedulerContainerWidth,
                        verticalAlign: "top"
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          ...schedulerContentStyle
                        }}
                        // style={schedulerContentStyle}
                        // ref={props.schedulerContentRef}
                        onMouseOver={props.onSchedulerContentMouseOver}
                        onFocus={props.onSchedulerContentMouseOver}
                        onMouseOut={props.onSchedulerContentMouseOut}
                        onBlur={props.onSchedulerContentMouseOut}
                        // onScroll={props.onSchedulerContentScroll}
                      >
                        <div style={{ width: schedulerWidth }}>
                          <div className="scheduler-content">
                            <table className="scheduler-content-table">
                              <tbody>{resourceEventsList}</tbody>
                            </table>
                          </div>
                          <div className="scheduler-bg">
                            <table
                              className="scheduler-bg-table"
                              style={{ width: schedulerWidth }}
                              ref={props.schedulerContentBgTableRef}
                            >
                              <BodyView
                                {...props}
                                // scroller={this.bodyScroller}
                                scroller={() => {}}
                                currentItem={filteredItem}
                              />
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              }
            </div>
          );
        })}

        <div
          style={{
            height: "4.5rem",
            minWidth: "24rem",
            width: "fit-content",
            backgroundColor: "#fff",
            display: "flex"
          }}
        >
          <div
            style={{ minWidth: "23.9rem", borderBottom }}
            className="bg-[#fff] stickyCell flex justify-end items-center px-4"
          >
            <Box className="flex justify-space w-full">
              <Box
                className="w-full cursor-pointer"
                onClick={openEditItemPopUp.bind(null, item)}
              >
                {" "}
                <Typography
                  variant="p2"
                  sx={{ color: "#888888", textDecoration: "underline" }}
                >
                  Actions <KeyboardArrowDownIcon />
                  {item?.editPopup && (
                    <Popover
                      content={editItems}
                      placement="bottom"
                      arrow={false}
                      trigger="click"
                      open={item?.editPopup}
                      overlayStyle={{ padding: 0 }}
                      overlayInnerStyle={{ padding: 0, borderRadius: "8px" }}
                      onOpenChange={() => {
                        closePopup();
                      }}
                    />
                  )}
                </Typography>
              </Box>
              <Box className="w-full">
                {/* <CustomAutoComplete options={[]} /> */}
                <input
                  type="text"
                  list="cars"
                  className="projectselctor"
                  placeholder="Projects"
                />
                <datalist id="cars" style={{ listStyleType: "solid" }}>
                  <option>Project-1</option>
                  <option>Project-2</option>
                  <option>Project-3</option>
                  <option>Project-4</option>
                </datalist>
              </Box>
            </Box>
          </div>
          <tr>
            <td>
              <div
                className="scheduler-view"
                style={{
                  width: schedulerContainerWidth,
                  verticalAlign: "top"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    ...schedulerContentStyle
                  }}
                  // style={schedulerContentStyle}
                  // ref={props.schedulerContentRef}
                  onMouseOver={props.onSchedulerContentMouseOver}
                  onFocus={props.onSchedulerContentMouseOver}
                  onMouseOut={props.onSchedulerContentMouseOut}
                  onBlur={props.onSchedulerContentMouseOut}
                  // onScroll={props.onSchedulerContentScroll}
                >
                  <div style={{ width: schedulerWidth }}>
                    <div className="scheduler-content">
                      <table className="scheduler-content-table">
                        <tbody>{dropDownEventList}</tbody>
                      </table>
                    </div>
                    <div className="scheduler-bg">
                      <table
                        className="scheduler-bg-table"
                        style={{ width: schedulerWidth }}
                        ref={props.schedulerContentBgTableRef}
                      >
                        <BodyView
                          {...props}
                          // scroller={this.bodyScroller}
                          scroller={() => {}}
                          currentItem={dropDownItem}
                        />
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>{" "}
        </div>
      </>
    );
  };
  return <div style={{ maxWidth: "100vw", overflow: "auto" }}>{getDivs()}</div>;
};

export default TableTry;
