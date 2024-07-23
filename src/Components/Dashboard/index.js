import * as React from "react";
import DashboardGraph from "./dashboardGraph";
import DashboardHead from "./dashboardHead";
import DTSpinner from "../../Shared-Components/DTSpinner";

const DashboardTab = () => {
  const [loading, setLoading] = React.useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)
  return (
    <>
      {loading ? (
        <DTSpinner open={loading} />
      ) : <>
        <DashboardHead />
        <DashboardGraph />
      </>}
    </>
  );
};

export default DashboardTab;
