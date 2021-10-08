import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout/Layout";
import { TicketBookingPage } from "./components/pages/TicketBookingPage";
import { TicketListPage } from "./components/pages/TicketListPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path={["/", "/tickets/book"]} exact>
            <TicketBookingPage />
          </Route>
          <Route path="/tickets/list" exact>
            <TicketListPage />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
