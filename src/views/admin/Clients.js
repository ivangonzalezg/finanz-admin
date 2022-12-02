import React, { useContext, useEffect, useState } from "react";
import CardClients from "../../components/Cards/CardClients.js";
import { StateContext } from "../../contexts";
import API, { getErrorMessage } from "../../api";

export default function Clients() {
  const state = useContext(StateContext);
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const { data: _clients } = await API(state.jwt).get(`/clients/clients-by-business/${state.business.id}`);
      setClients(_clients);
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  useEffect(() => {
    if (state.business?.id) {
      getClients();
    }
  }, [state.business]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardClients clients={clients} />
        </div>
      </div>
    </>
  );
}
