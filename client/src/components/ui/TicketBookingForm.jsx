import { useContext, useEffect, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import {
  createBooking,
  getBookingCountByMobile,
  getBookingsByDate,
} from "../../services/booking";
import "../../utils/date";
import { dateToYYYYMMDD } from "../../utils/date";
import { BookingContext } from "../pages/TicketBookingPage";
import MessageModal from "./modals/MessageModal";
import { SheetSelector } from "./SheetSelector";

const TicketBookingForm = (props) => {
  const { selectedDate, setSelectedDate, resetBookings } =
    useContext(BookingContext);
  const [selectedSheets, setSelectedSheets] = useState({});
  const [bookedSheetByUser, setBookedSheetByUser] = useState(0);

  const [popup, setPopup] = useState({ open: false });
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    date: selectedDate,
    mobile: "",
  });

  useEffect(() => {
    const { mobile, date } = form;
    setBookedSheetByUser(0);
    setMessage(null);
    if (date && mobile) {
      if (mobile.trim().length > 9)
        getBookingCountByMobile(mobile, date).then((data) => {
          const { sheetBooked } = data;
          console.log({ sheetBooked });
          setBookedSheetByUser(sheetBooked);
          if (sheetBooked >= 6) {
            return setMessage(
              `Already Booked ${sheetBooked} Sheets On Selected Date.`
            );
          } else {
            setMessage(null);
          }
        });
    }
  }, [form]);

  useEffect(() => {
    setForm({ ...form, date: selectedDate });
  }, [selectedDate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      return setSelectedDate(value);
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    if (!Object.values(selectedSheets).length) {
      return setMessage("Select Sheets");
    }

    const formData = {
      mobile: form.mobile,
      date: form.date,
      sheets: Object.values(selectedSheets).map(({ series, number }) => ({
        series,
        number,
      })),
    };

    createBooking(formData)
      .then(({ booking }) => {
        setSelectedSheets({});
        resetBookings();
        setPopup({
          open: true,
          title: "Ticket Booked",
          content: (
            <div>
              <p>Booking Id: {booking.bookingId}</p>
              <p>Mobile Number: {booking.mobile}</p>
              <p>
                Sheets:{" "}
                {booking.sheets
                  .map((sheet) => `${sheet.series}${sheet.number}`)
                  .join(", ")}
              </p>
            </div>
          ),
        });
      })
      .catch((error) => {
        const data = error.response.data;
        setMessage({
          open: true,
          title: "Error",
          content: data.error,
        });
      });
  };

  const showMessage = (title, message) => {
    setPopup({
      open: true,
      title,
      content: message,
    });
  };

  return (
    <div className="m-4">
      {message && <Message color="grey">{message}</Message>}

      <MessageModal
        open={popup.open}
        title={popup.title}
        onClose={() => setPopup({ open: false })}
      >
        {popup.content}
      </MessageModal>

      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <label>Mobile Number</label>
          <input
            value={form.mobile}
            onChange={handleInputChange}
            placeholder="Mobile"
            type="number"
            name="mobile"
          />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input
            placeholder="Date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
          />
        </Form.Field>
        <SheetSelector
          {...{
            selectedSheets,
            setSelectedSheets,
            bookedSheetByUser,
            showMessage,
          }}
        ></SheetSelector>
        <hr />
        <Button color={"black"} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export { TicketBookingForm };
