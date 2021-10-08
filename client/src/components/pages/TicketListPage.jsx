import { useEffect, useState } from "react";
import { getListOfBookings } from "../../services/booking";
import { createSheetSeries } from "../../utils/sheet";

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
        <table className="table table-bordered table-hover table-striped">
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>
                  {booking.sheets
                    .map((sheet) => `${sheet.series}${sheet.number}`)
                    .join(", ")}
                </td>
                <td>{booking.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TicketListPage };
