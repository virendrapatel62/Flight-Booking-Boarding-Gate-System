import React, { useEffect } from "react";
import { useState } from "react";
import { getBookingsByDate } from "../../services/booking";
import "../../utils/date";
import { dateToYYYYMMDD } from "../../utils/date";
import MessageModal from "../ui/modals/MessageModal";
import { TicketBookingForm } from "../ui/TicketBookingForm";

const BookingContext = React.createContext();

const TicketBookingPage = (props) => {
  console.log(dateToYYYYMMDD(new Date()));
  const [selectedDate, setSelectedDate] = useState(dateToYYYYMMDD(new Date()));
  const [bookings, setBookings] = useState([]);

  const resetBookings = () => {
    getBookingsByDate(selectedDate).then(({ bookings }) => {
      setBookings(bookings);
    });
  };

  const context = { bookings, selectedDate, setSelectedDate, resetBookings };

  useEffect(() => {
    setBookings([]);
    console.log("DATE CHANGED>>.");
    resetBookings();
  }, [selectedDate]);

  return (
    <BookingContext.Provider value={context}>
      <div className="col-lg-6 col-md-8 mx-auto shadow rounded py-4">
        <TicketBookingForm />
      </div>
    </BookingContext.Provider>
  );
};

export { TicketBookingPage, BookingContext };
