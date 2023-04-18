import React, { useState } from "react";
import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

function Header(props) {
  let navigate = useNavigate();

  // const [selectedTracks, setSelectedTracks] = useState(JSON.parse(localStorage.getItem("selectedTracks")) || []);
  const userId = localStorage.getItem("userId");
  return (
    <div className="header">
      <Navbar key="md" expand="md">
        <div className="container-fluid">
          <div className="header-logo">
            <div className="header-logo-content">
              <p>Today music is clear</p>
              <h4>오늘 음악 맑음</h4>
            </div>
          </div>
          <div className="header-nav">
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />

            <Navbar.Offcanvas id="offcanvasNavbar-expand-md" aria-labelledby="offcanvasNavbarLabel-expand-md" placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                  <span className="header-nav-logo" style={{ display: "block" }}>
                    Today music is clear
                  </span>
                  오늘 음악 맑음
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 row">
                  <form action="/post" method="POST" className="col-6">
                    <div className="search-form">
                      <div className="form">
                        <input
                          className="search-input"
                          type="input"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              props.searchSpotify();
                              navigate("/search");
                            }
                          }}
                          onChange={(e) => {
                            props.setSearchInput(e.target.value);
                          }}
                          placeholder="취향을 발견해보세요."
                          name="search"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            props.searchSpotify();
                            navigate("/search");
                          }}
                          className="search-enter"
                        >
                          <span>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="header-nav-content col-6">
                    <a
                      className="header-nav-btn"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      #Now
                    </a>
                    <a
                      className="header-nav-btn"
                      onClick={() => {
                        navigate("/post");
                      }}
                    >
                      #MyPlaylist
                    </a>
                    <a
                      className="header-nav-btn"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      {userId === null ? "#Login" : "#Logout"}
                    </a>
                    <a
                      className="header-nav-btn"
                      onClick={() => {
                        navigate("/join");
                      }}
                    >
                      #Join
                    </a>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
