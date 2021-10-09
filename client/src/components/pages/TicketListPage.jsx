import { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { getListOfBookings } from "../../services/booking";
import { dateToYYYYMMDD } from "../../utils/date";
import { SheetSelectorUI } from "../ui/SheetSelectorUI";

const TicketListPage = (props) => {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState(dateToYYYYMMDD(new Date()));
  useEffect(() => {
    getListOfBookings({ date }).then((list) => {
      setBookings(list);
    });
  }, [date]);

  const handleDateChange = ({ target: { name, value } }) => {
    setDate(value);
  };

  return (
    <div>
      <div className="col-lg-7 mx-auto">
        <h4 className="display-6">Bookings </h4>
        <Form>
          <Form.Field>
            <label>Date</label>
            <input
              placeholder="Date"
              type="date"
              name="date"
              value={date}
              onChange={handleDateChange}
            />
          </Form.Field>
        </Form>
        <hr />
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Booking Id</th>
              <th>Date</th>
              <th>Sheets</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>{new Date(booking.date).toDateString()}</td>
                <td>
                  {booking.sheets
                    .map((sheet) => `${sheet.series}${sheet.number}`)
                    .join(", ")}
                </td>
                <td>
                  <a
                    style={{
                      textDecoration: "none",
                    }}
                    href={`tel:${booking.mobile}`}
                    target="_blank"
                  >
                    📞
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TicketListPage };
