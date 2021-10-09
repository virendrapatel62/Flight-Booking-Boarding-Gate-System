import { useContext, useEffect, useState } from "react";
import "../../utils/date";
import { BookingContext } from "../pages/TicketBookingPage";
import { SheetSelectorUI } from "./SheetSelectorUI";

const SheetSelector = (props) => {
  const { bookings } = useContext(BookingContext);
  const {
    selectedSheets,
    onSheetUnSelect,
    onSheetSelect,
    bookedSheetByUser,
    showMessage,
  } = props;

  const [bookedSheets, setBookedSheets] = useState([]);

  useEffect(() => {
    if (bookings.length) {
      const bookedSheets = bookings.reduce(
        (sheets, booking) => [...sheets, ...booking.sheets],
        []
      );
      setBookedSheets(bookedSheets);
    } else {
      setBookedSheets([]);
    }
  }, [bookings]);

  const handleSheetClick = (sheet) => {
    const isBooked = bookedSheets.findIndex(
      ({ series, number }) => sheet.series === series && sheet.number === number
    );

    if (isBooked > -1) {
      return;
    }

    const indexOfSelectedSheet = selectedSheets.findIndex(
      ({ series, number }) => sheet.series === series && sheet.number === number
    );

    if (indexOfSelectedSheet > -1) {
      onSheetUnSelect(sheet, indexOfSelectedSheet);
      return;
    }

    const selectedSheetsCount = selectedSheets.length;
    if (selectedSheetsCount === 6) {
      alert("Cant select more then 6");
      return;
    }

    if (selectedSheetsCount + bookedSheetByUser >= 6) {
      return showMessage(
        "Message",
        `Already Booked ${bookedSheetByUser} sheets, You can only select ${
          6 - bookedSheetByUser
        }`
      );
    }
    onSheetSelect(sheet, true);
  };

  return (
    <SheetSelectorUI
      bookedSheets={bookedSheets}
      selectedSheets={selectedSheets}
      onSheetClick={handleSheetClick}
    />
  );
};

export { SheetSelector };
