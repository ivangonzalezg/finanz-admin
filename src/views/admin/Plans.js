import React, { useContext, useEffect, useState } from "react";
import CardPlans from "../../components/Cards/CardPlans";
import { StateContext } from "../../contexts";
import API, { getErrorMessage } from "../../api";

export default function Clients() {
  const state = useContext(StateContext);
  const [plans, setPlans] = useState([]);

  const getClients = async () => {
    try {
      const { data: plans } = await API(state.jwt).get(`/plans/plans-by-business/${state.business.id}`);
      setPlans(plans);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardPlans plans={plans} />
        </div>
      </div>
    </>
  );
}
