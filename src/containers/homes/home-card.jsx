import React from "react";

function HomeCard(props) {
  const { homes } = props;
  return (
    <div className="homes-grid">
      {homes.map((home) => (
        <div key={home._id} className="home-card-wrapper">
          <div className="home-card">
            <div className="home-content">
              <h4>{home.title.toUpperCase()}</h4>
            </div>
            <img alt={home.title} src={home.cover} />
            <div className="price-tag">{`£${home.price}`}</div>
            {home.location ? (
              <div className="location">{home.location}</div>
            ) : (
              ""
            )}
            <p className="description">{home.description}</p>
            {home.extras ? (
              <ul class="extras">
                <li>
                  Free :
                  {home.extras.free.length ? (
                    home.extras.free.map((item) => {
                      return <span>{" " + item + " "}</span>;
                    })
                  ) : (
                    <span style={{ color: "#ababab" }}>{" Not Available"}</span>
                  )}
                </li>
                <li>
                  Paid :
                  {home.extras.paid.length ? (
                    home.extras.paid.map((item) => {
                      return <span>{" " + item + " "}</span>;
                    })
                  ) : (
                    <span style={{ color: "#ababab" }}>{" Not Available"}</span>
                  )}
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeCard;
