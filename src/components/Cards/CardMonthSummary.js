import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

function CardMonthSummary(props) {
  const { data } = props;

  React.useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Ventas mensuales",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: Object.values(data),
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Ventas mensuales"
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)"
          },
          align: "end",
          position: "bottom"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month"
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value"
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
              }
            }
          ]
        }
      }
    };
    const ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [data]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Últimos 6 meses</h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">Ventas mensuales</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

CardMonthSummary.propTypes = {
  data: PropTypes.object.isRequired
};

export default CardMonthSummary;
