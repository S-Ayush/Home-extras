import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomesLayout from "../components/layouts/homes";
import HomeCard from "../containers/homes/home-card";
import { fetchExtrasDetails } from "../framework/rest-api/actions";

function Extras() {
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    fetchExtrasDetails()
      .then((res) => setExtras(res.data))
      .catch((ex) => toast.error(ex.response?.data || ex.message));
  }, []);
  return (
    <HomesLayout>
      <div>
        <div className="page-title">
          <h2>Extras</h2>
        </div>
        {extras.length === 0 && (
          <div>
            <p style={{ textAlign: "center" }}>No Extras yet!</p>
          </div>
        )}
        {extras ? <HomeCard homes={extras} /> : ""}
      </div>
    </HomesLayout>
  );
}

export default Extras;
