import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavProvider from "../../../../components/Sidebar/NavProvider";

const NavItemLink = ({ name, link }) => (
  <li className="nav-item">
    <Link className="nav-link" to={link}>
      <span>{name}</span>
    </Link>
  </li>
);

const OffcanvasSidebar = ({ openned = false }) => {
  return (
    <>
      <NavProvider state={openned}>
        {({ show, setShow }) => (
          <>
            {show && (
              <Offcanvas
                className={
                  "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                }
                show={show}
                onHide={() => setShow(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    {" "}
                    <a
                      className="sidebar-brand d-flex align-items-center justify-content-center"
                      href="index.html"
                    >
                      <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                      </div>
                      <div className="sidebar-brand-text mx-3">
                        Parceiro <sup> Porttal </sup>
                      </div>
                    </a>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ul
                    className={
                      "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                    }
                  >
                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                      <a className="nav-link" href="index.html">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                      </a>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Acompanhamento</div>
                    <NavItemLink link={"/leads"} name={"leads"} />
                    <li className="nav-item">
                      <a
                        className="nav-link collapsed"
                        href="#"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                      </a>
                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionSidebar"
                      >
                        <div className="bg-white py-2 collapse-inner rounded">
                          <h6 className="collapse-header">
                            Custom Components:
                          </h6>
                          <a className="collapse-item" href="buttons.html">
                            Buttons
                          </a>
                          <a className="collapse-item" href="cards.html">
                            Cards
                          </a>
                        </div>
                      </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Ferramentas</div>

                    <NavItemLink
                      link={"/simulation/HE"}
                      name={"Simulação H.E."}
                    />
                    <NavItemLink
                      link={"/simulation/FI"}
                      name={"Simulação Finan."}
                    />
                    <NavItemLink
                      link={"/leads/New"}
                      name={"Cadastro Novo Cliente"}
                    />

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">Admnistrador</div>

                    <NavItemLink link={"/protected"} name={"Organização"} />
                    <NavItemLink link={"/members"} name={"Consultores"} />

                    <hr className="sidebar-divider d-none d-md-block" />

                    <div className="text-center d-none d-md-inline">
                      <button
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                      />
                    </div>
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            )}
          </>
        )}
      </NavProvider>
    </>
  );
};

export default OffcanvasSidebar;
