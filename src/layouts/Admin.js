import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";
import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";
import API, { getErrorMessage } from "../api/index.js";
import { StateContext } from "../contexts/state.js";
import Clients from "../views/admin/Clients.js";
import Plans from "../views/admin/Plans";

export default function Admin() {
  const state = useContext(StateContext);
  const [approvedPayments, setApprovedPayments] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [latePayments, setLatePayments] = useState(0);

  const getPayments = async () => {
    try {
      const {
        data: { approvedPayments: _approvedPayments, pendingPayments: _pendingPayments, latePayments: _latePayments }
      } = await API(state.jwt).get(`/payments/stats/${state.user.id}`);
      setApprovedPayments(_approvedPayments);
      setPendingPayments(_pendingPayments);
      setLatePayments(_latePayments);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats payments={approvedPayments} pendingPayments={pendingPayments} latePayments={latePayments} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/clients" exact component={Clients} />
            <Route path="/plans" exact component={Plans} />
            <Route path="/maps" exact component={Maps} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/tables" exact component={Tables} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
