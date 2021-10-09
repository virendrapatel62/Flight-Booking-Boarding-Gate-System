import { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { SheetImageHintLabel } from "./css/SheetSelector.module.css";
import PropTypes from "prop-types";

import "../../utils/date";
import { dateToYYYYMMDD } from "../../utils/date";
import { BookingContext } from "../pages/TicketBookingPage";
import { generate } from "shortid";
import { Message } from "semantic-ui-react";
import { createSheetSeries, arrayOf } from "../../utils/sheet";
import { propTypes } from "react-bootstrap/esm/Image";

const SheetSelectorUI = (props) => {
  console.log({ props });
  const { selectedSheets, bookedSheets } = props;
  const numberOfSheetsInLeftSide = props.numberOfSheetsInLeftSide;
  const numberOfSheetsInRightSide = props.numberOfSheetsInRightSide;
  const onSheetClick = props.onSheetClick
    ? props.onSheetClick
    : () => {
        console.error("OnSheetClicked have not implemented");
      };

  const sheetImage = "/sheet.png";
  const bookedSheetImage = "/bookedsheet.png";
  const selectedSheetImage = "/check.png";

  const [selectedSheetsMap, setSelectedSheetsMap] = useState({}); // { "A1" : {number : '' , series : ''}  }
  const [BookedSheetsMap, setBookedSheetsMap] = useState({}); // { "A1" : {number : '' , series : ''}  }

  //   change to object
  useEffect(() => {
    console.log({ selectedSheets, bookedSheets });
    const bookedReduced = bookedSheets.reduce((mapped, { series, number }) => {
      mapped[`${series + number}`] = { series, number };
      return mapped;
    }, {});

    const selectedMapped = selectedSheets.reduce(
      (mapped, { series, number }) => {
        mapped[`${series + number}`] = { series, number };
        return mapped;
      },
      {}
    );
    setSelectedSheetsMap(selectedMapped);
    setBookedSheetsMap(bookedReduced);

    console.log(selectedSheetsMap);
  }, [bookedSheets, selectedSheets]);

  const [sheetArrangement, setSheetArrangement] = useState({
    leftRow: [],
    rightRow: [],
  });

  const [columns] = useState(createSheetSeries());

  useEffect(() => {
    const [left, right] = [[], []];
    columns.forEach((series) => {
      const row = arrayOf(numberOfSheetsInLeftSide).map((_, index) => {
        return {
          name: `${series}${index + 1}`,
          series,
          number: index + 1,
        };
      });
      const row2 = arrayOf(numberOfSheetsInRightSide).map((_, index) => {
        return {
          name: `${series}${index + 1 + numberOfSheetsInLeftSide}`,
          series,
          number: index + 1 + numberOfSheetsInLeftSide,
        };
      });

      left.push(row);
      right.push(row2);
    });
    setSheetArrangement({ leftRow: left, rightRow: right });
  }, [columns]);

  const renderImageIcon = (src, classes) => {
    return (
      <img
        className={`rounded mx-auto d-block ${classes}`}
        height="30px"
        src={src}
      ></img>
    );
  };

  const isBooked = (sheet) => {
    const { name } = sheet;
    return !!BookedSheetsMap[name];
  };
  const isSelected = (sheet) => {
    const { name } = sheet;
    return !!selectedSheetsMap[name];
  };

  const handleSheetClick = ({ name, series, number }) => {
    const sheet = { series, number };
    onSheetClick(sheet);
  };

  return (
    <div className="">
      <div>
        <hr />
        <RenderIconHint />
        <hr />
        <h4 className="">Select Sheets</h4>
        <hr />
      </div>
      <div className="row">
        {/* LEFT ROW ... */}
        <div className="col  rounded">
          {sheetArrangement.leftRow.map((item, index) => (
            <div className="row" key={index}>
              {item.map((sheet, index) => (
                <RenderSheet key={index} sheet={sheet} />
              ))}
            </div>
          ))}
        </div>

        <div className="col-2">
          <div className="row">
            {columns.map((col, index) => (
              <div key={index} className="p-2 col-12 text-center">
                {renderImageIcon(
                  "/down.png",
                  index % 3 === 0 ? "visible" : "invisible"
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ROW */}
        <div className="col rounded">
          {sheetArrangement.rightRow.map((item, index) => (
            <div key={index} className="row">
              {item.map((sheet, index) => (
                <RenderSheet key={index} sheet={sheet} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function RenderSheet({ sheet }) {
    return (
      <Fragment key={generate()}>
        {isSelected(sheet) ? (
          <div
            className={`col p-2 hand`}
            onClick={() => handleSheetClick(sheet)}
          >
            {/* {item.name} */}
            {renderImageIcon(selectedSheetImage)}
          </div>
        ) : !isBooked(sheet) ? (
          <div
            className={`col p-2 hand`}
            onClick={() => handleSheetClick(sheet)}
          >
            {/* {item.name} */}
            {renderImageIcon(sheetImage)}
          </div>
        ) : (
          <div className={`col p-2 blocked`} title="Booked!">
            {/* {item.name} */}

            {renderImageIcon(bookedSheetImage)}
          </div>
        )}
      </Fragment>
    );
  }

  function RenderIconHint() {
    return (
      <Message className="row">
        <div className="col mt-2">
          <p style={{ verticalAlign: "center" }}>
            <span className={`${SheetImageHintLabel}`}>
              Selected <img src={selectedSheetImage} />
            </span>
          </p>
        </div>
        <div className="col mt-2">
          <p style={{ verticalAlign: "center" }}>
            <span className={`${SheetImageHintLabel}`}>
              Available <img src={sheetImage} />
            </span>
          </p>
        </div>
        <div className="col mt-2">
          <p style={{ verticalAlign: "center" }}>
            <span className={`${SheetImageHintLabel}`}>
              Booked
              <img src={bookedSheetImage} />
            </span>
          </p>
        </div>
      </Message>
    );
  }
};

const sheetShape = PropTypes.shape({
  series: PropTypes.string,
  number: PropTypes.number,
});

SheetSelectorUI.defaultProps = {
  selectedSheets: [],
  bookedSheets: [],
  numberOfSheetsInLeftSide: 3,
  numberOfSheetsInRightSide: 3,
};

SheetSelectorUI.propTypes = {
  selectedSheets: PropTypes.arrayOf(sheetShape),
  bookedSheets: PropTypes.arrayOf(sheetShape),
  numberOfSheetsInLeftSide: PropTypes.number,
  numberOfSheetsInRightSide: PropTypes.number,
  onSheetClick: PropTypes.func,
};

export { SheetSelectorUI };
