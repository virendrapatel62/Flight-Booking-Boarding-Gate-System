import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListOfBookings } from "../../services/booking";
import { createSheetSeries } from "../../utils/sheet";
import { SheetSelectorUI } from "../ui/SheetSelectorUI";

const TicketListPage = (props) => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getListOfBookings().then((list) => {
      setBookings(list);
    });
  }, []);
  return (
    <div>
      <div className="col-lg-7 mx-auto">
        <h4 className="display-6">Bookings </h4>

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

        <SheetSelectorUI
          selectedSheets={[{ series: "A", number: 3 }]}
          bookedSheets={[{ series: "B", number: 6 }]}
          onSheetClick={console.log}
        ></SheetSelectorUI>
      </div>
    </div>
  );
};

export { TicketListPage };
