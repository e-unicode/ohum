import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header(props) {
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
                  <span className="nav-logo" style={{ display: "block" }}>
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
                              props.setSearchInputTag(true);
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
                            props.setSearchInputTag(true);
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
                    <a href="/" className="header-nav-btn">
                      #오늘음악
                    </a>
                    <a href="/post" className="header-nav-btn">
                      #취향공유
                    </a>
                    <a href="/enter" className="header-nav-btn">
                      #로그인
                    </a>
                    <a href="/join" className="header-nav-btn">
                      #가입
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
