import React from "react";
import PropTypes from "prop-types";
import CardStats from "../Cards/CardStats";

function HeaderStats(props) {
  const { payments, pendingPayments, latePayments } = props;

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Pagos"
                  statTitle={String(payments)}
                  statIconName="fas fa-money-bill"
                  statIconColor="bg-emerald-500"
                  hidePercent
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Pendientes"
                  statTitle={String(pendingPayments)}
                  statIconName="fas fa-clock"
                  statIconColor="bg-orange-500"
                  hidePercent
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Atrasados"
                  statTitle={String(latePayments)}
                  statIconName="fas fa-coins"
                  statIconColor="bg-red-500"
                  hidePercent
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HeaderStats.propTypes = {
  payments: PropTypes.number,
  pendingPayments: PropTypes.number,
  latePayments: PropTypes.number
};

HeaderStats.defaultProps = {
  payments: 0,
  pendingPayments: 0,
  latePayments: 0
};

export default HeaderStats;
