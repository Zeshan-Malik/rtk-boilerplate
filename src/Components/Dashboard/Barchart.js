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
import { getGraphsData } from "./dashboardSlice";
import { useNavigate } from "react-router-dom";

export default function Graphs() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [chartsData, setChartsData] = useState([]);
  const getData = async () => {
    const response = {
      Honda: 1,
      Toyota: 1,
      KIA :1,
      Buggati :1,
      Ferrari:1,
      Mehran:1,
      Suzuki:1}
    const res = await dispatch(getGraphsData());
    let keys = Object.keys(response);
    let tempData = keys?.map((item, index) => ({
      [item]: response[item]
    }));
    setChartsData([res.payload.data.data, ...tempData]);
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
      width={600}
        barGap={'auto'}
        data={chartsData}
        margin={{
          top: 30,
          bottom: 0,
          right: 30,
        }}
          barSize={20}
        barCategoryGap={15}
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
          dataKey="Buggati"
          fill="#DAA520"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
        <Bar
          dataKey="Toyota"
          fill="#FF3333"
          radius={[10, 10, 10, 10]}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        />
              )}
      </BarChart>
    </ResponsiveContainer>
  );
}
