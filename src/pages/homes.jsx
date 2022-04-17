import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomesLayout from "../components/layouts/homes";
import HomeCard from "../containers/homes/home-card";
import { fetchHomeDetails } from "../framework/rest-api/actions";

function Homes() {
  const [homes, setHomes] = useState([
    {
      cover: "",
      createdAt: "2022-03-29T09:26:45.304Z",
      createdBy: "6242d055f4a527bdddfa2c32",
      description: "This is my first home ",
      extras: { free: [""], paid: [""] },
      location: "United States",
      price: "35",
      title: "Classic",
      updatedAt: "2022-03-29T09:26:45.304Z",
      __v: 0,
      _id: "6242d0d5f4a527bdddfa2c37",
    },
  ]);

  useEffect(() => {
    fetchHomeDetails()
      .then((res) => setHomes(res.data))
      .catch((ex) => toast.error(ex.response?.data || ex.message));
  }, []);

  return (
    <HomesLayout>
      <div>
        <div className="page-title">
          <h2>Homes</h2>
        </div>
        {homes.length === 0 && (
          <div>
            <p style={{ textAlign: "center" }}>No Homes yet!</p>
          </div>
        )}
        {homes ? <HomeCard homes={homes} /> : ""}
      </div>
    </HomesLayout>
  );
}

export default Homes;
