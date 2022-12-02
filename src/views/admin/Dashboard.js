import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import API, { getErrorMessage } from "../../api";
import { StateContext } from "../../contexts";
import { formatToCurrency } from "../../utils";
import CardMonthSummary from "../../components/Cards/CardMonthSummary";

export default function Dashboard() {
  const state = useContext(StateContext);
  const [lastPayments, setLastPayments] = useState([]);
  const [lastPaymentsByMonth, setLastPaymentsByMonth] = useState({});

  const getLastPayments = async () => {
    try {
      const { data: _lastPayments } = await API(state.jwt).get(`/payments/last-payments/${state.user.id}`);
      setLastPayments(_lastPayments);
      const { data: _lastPaymentsByMonth } = await API(state.jwt).get(`/payments/last-payments-by-month/${state.user.id}`);
      setLastPaymentsByMonth(_lastPaymentsByMonth);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getLastPayments();
  }, []);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">Últimos pagos</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Cliente
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Cantidad
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {lastPayments.map(lastPayment => (
                  <tr key={lastPayment.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {lastPayment.client}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {formatToCurrency(lastPayment.amount)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {moment(lastPayment.approvedAt).format("Y-MM-DD hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CardMonthSummary data={lastPaymentsByMonth} />
      </div>
    </div>
  );
}
