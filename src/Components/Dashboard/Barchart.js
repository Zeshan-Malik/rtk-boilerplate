import React, { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDispatch } from "react-redux";
// import { GetBarChartData } from "./dashboardSlice";
import { useNavigate } from "react-router-dom";

export default function Graphs() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [chartsData, setChartsData] = useState([]);
  const getData = async () => {
    const playerParams = "?_dc=1675165241900&page=1&start=0&limit=25";
    const response = {
      Honda: 8,
      Toyota: 10,
      KIA :22,
      Buggati :1,
      Ferrari:2,
      Mehran:4,
      Suzuki:4}
    // const response = await dispatch(GetBarChartData(playerParams));
    let keys = Object.keys(response);
    let tempData = keys?.map((item, index) => ({
      [item]: response[item]
    }));
    setChartsData(tempData);
  };
  useEffect(() => {
    getData();
  }, []);

  const CustomTooltip = (data) => {
    return (
      <div className="custom-tooltip">
        <p>{`${data.payload[0]?.value
          } Available`}</p>
      </div>
    );
  };
  const Content = ({ name, value }) => {
    return (
      <div>
        <a href="/">{name}</a>
        <span>{value}</span>
      </div>
    );
  };
  const [tooltip, setTooltip] = useState({});
  let tooltipTimeout;
  const showTooltip = (item, i, e) => {
    clearTimeout(tooltipTimeout);
    setTooltip({
      show: true,
      content: <Content name={item.name} value={item.value} />,
    });
  };

  const hideTooltip = (e) => {
  };

  const redirectToPlayer = (val) => {
    localStorage.setItem("Player_Status", val);
    navigate({ pathname: "/location_&_players" });
    window.location.reload();
  };
  return (
    <ResponsiveContainer>
      <BarChart
        barGap={-10}
        data={chartsData}
        margin={{
          top: 30,
          bottom: 0,
          right: 30,
        }}
        barCategoryGap={5}
      >
        <YAxis
          width={40}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Legend
          height={130}
          className="legends"
          iconSize={20}
          wrapperStyle={{ whiteSpace: "break-spaces" }}
          iconType={"rect"}
        />
        <Bar
          onClick={() => redirectToPlayer("Sync")}
          dataKey="Honda"
          fill="#008000"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}

        />
        <Bar
          onClick={() => redirectToPlayer("Unsync")}
          dataKey="Toyota"
          fill="#DAA520"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          onClick={() => redirectToPlayer("Unreachable")}
          dataKey="Buggati"
          fill="#FF3333"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          onClick={() => redirectToPlayer("Error")}
          dataKey="Ferrari"
          fill="#2D2D2D"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          onClick={() => redirectToPlayer("Expired")}
          dataKey="Expired"
          fill="rgb(102, 0, 0)"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          onClick={() => redirectToPlayer("Idle")}
          dataKey="Mehran"
          fill="#808080"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          onClick={() => redirectToPlayer("Downloading")}
          dataKey="Suzuki"
          fill="#FFD700"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        {tooltip.show && (
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            cursor={false}
            content={<CustomTooltip {...tooltip} />}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
