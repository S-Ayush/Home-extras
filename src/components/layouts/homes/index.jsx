import { useState } from "react";
import { Link } from "react-router-dom";
import defaultCover from "../../../assets/images/cover-1.jpeg";
import "./styles.css";

function HomesLayout({ children, coverImg }) {
  const [toogleMenu, setToogleMenu] = useState(false);
  return (
    <div className="wrapper" onClick={() => setToogleMenu(false)}>
      <div className="cover wave">
        <div className="overlay wave" />
        <img alt="Home cover" src={coverImg || defaultCover} />
        <div className="content">
          <h1 className="title">HOME EXTRAS</h1>
        </div>
      </div>
      <header>
        <nav
          className="navigation"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="logo">
            <Link to={"/"}>
              <h1>LOGO</h1>
            </Link>
          </div>

          <ul className={`menu-list ${toogleMenu ? "show" : ""}`}>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/homes">Homes</Link>
            </li>
            <li>
              <Link to="/extras">Extras</Link>
            </li>
          </ul>

          <div
            className="humbarger"
            onClick={(e) => {
              setToogleMenu(!toogleMenu);
              e.stopPropagation();
            }}
          >
            <div className="bar"></div>
            <div className="bar2 bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </header>

      {children}
    </div>
  );
}

export default HomesLayout;
