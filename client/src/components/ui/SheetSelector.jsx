import { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import "../../utils/date";
import { dateToYYYYMMDD } from "../../utils/date";
import { BookingContext } from "../pages/TicketBookingPage";
import { generate } from "shortid";
import { createSheetSeries, arrayOf } from "../../utils/sheet";

const SheetSelector = (props) => {
  const { bookings } = useContext(BookingContext);
  const [bookedSheetsMap, setBookedSheetMap] = useState({});
  const { selectedSheets, setSelectedSheets, bookedSheetByUser, showMessage } =
    props;
  const leftRow = 3;
  const rightRow = 3;
  const [columns] = useState(createSheetSeries());
  const [sheetArrangement, setSheetArrangement] = useState({
    leftRow: [],
    rightRow: [],
  });

  const sheetImage = "/sheet.png";
  //   const sheetImage = "/selectedsheet.png";
  const bookedSheetImage = "/bookedsheet.png";
  const selectedSheetImage = "/check.png";

  useEffect(() => {
    setBookedSheetMap({});
    setSelectedSheets({});
  }, [bookings]);

  useEffect(() => {
    if (bookings.length) {
      console.log({ bookings });
      const bookedSheets = bookings
        .reduce((sheets, booking) => [...sheets, ...booking.sheets], [])
        .map((sheet) => `${sheet.series}${sheet.number}`)
        .reduce((maped, item) => {
          maped[item] = true;
          return maped;
        }, {});

      setBookedSheetMap(bookedSheets);
    }
  }, [bookings]);

  const isBooked = (sheet) => {
    return bookedSheetsMap[sheet.name];
  };
  const isSelected = (sheet) => {
    // console.log({ sheet });
    return selectedSheets[sheet.name];
  };

  useEffect(() => {
    const [left, right] = [[], []];
    columns.forEach((series) => {
      const row = arrayOf(leftRow).map((_, index) => {
        return {
          name: `${series}${index + 1}`,
          series,
          number: index + 1,
        };
      });
      const row2 = arrayOf(rightRow).map((_, index) => {
        return {
          name: `${series}${index + 1 + leftRow}`,
          series,
          number: index + 1 + leftRow,
        };
      });

      left.push(row);
      right.push(row2);
    });
    setSheetArrangement({ leftRow: left, rightRow: right });
  }, [columns]);

  const handleSheetClick = (sheet) => {
    console.log({ sheet: sheet.name });
    console.log(selectedSheets);

    if (selectedSheets[sheet.name]) {
      const temp = { ...selectedSheets };
      delete temp[sheet.name];
      setSelectedSheets(temp);
      return;
    }
    const selectedLength = Object.keys(selectedSheets).length;
    if (selectedLength === 6) {
      return alert("Cant select more then 6");
    }

    if (selectedLength + bookedSheetByUser >= 6) {
      return showMessage(
        "Message",
        `Already Booked ${bookedSheetByUser} sheets, You can only select ${
          6 - bookedSheetByUser
        }`
      );
    }
    setSelectedSheets({ ...selectedSheets, [sheet.name]: sheet });
  };

  const renderImageIcon = (src, classes) => {
    return (
      <img
        className={`rounded mx-auto d-block ${classes}`}
        height="30px"
        src={src}
      ></img>
    );
  };

  const renderSheet = (sheet) => {
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
  };

  let key = 1;
  const getKey = () => {
    return key++;
  };

  return (
    <div className="">
      <div>
        <hr />
        <h4 className="">Select Sheets</h4>
        <hr />
      </div>
      <div className="row">
        {/* LEFT ROW ... */}
        <div className="col  rounded">
          {sheetArrangement.leftRow.map((item, index) => (
            <div className="row" key={index}>
              {item.map((sheet) => renderSheet(sheet, index))}
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
              {item.map((sheet) => renderSheet(sheet, index))}
            </div>
          ))}
        </div>
      </div>
      {/* {JSON.stringify(sheetArrangement)} */}
    </div>
  );
};

export { SheetSelector };
