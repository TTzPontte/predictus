import { Link } from "react-router-dom";
import React from "react";
import useWindowSize from "../Hooks/usewindowSize";
import { Col, Row } from "react-bootstrap";

const NavItemLink = ({ name, link, fa = "", active = "" }) => (
    <li className={`nav-item  ${active}`}>
      <Row className="w-100">
        <Col>
          {!fa && <i className={fa} />}
          <Link className="nav-link " to={link}>
            <i className={`fas fa-fw fa-${fa}`} />
            <span>{name}</span>
          </Link>
        </Col>
      </Row>
    </li>
);
// todo  logo should have padding: inherit and media query for small devices with     padding: 1.5rem 1rem
const Divider = ({ clsx = "" }) => <hr className={`sidebar-divider ${clsx}`} />;
const navlinks = [
  {
    title: "Home Equity",
    links: [
      {
        link: "/simulation/HE",
        name: "Simulação",
        fa: "hand-holding-usd",
        clsx: "my-0"
      },
      {
        link: "/leads/HomeEquity",
        name: "Cadastro",
        fa: "landmark",
        clsx: "my-0"
      }
    ]
  },
  {
    title: "Financiamento",
    links: [
      {
        link: "/simulation/FI",
        name: "Simulação",
        fa: "hand-holding-usd"
      },
      {
        link: "/leads/Financing",
        name: "Cadastro",
        fa: "landmark",
        clsx: "my-0"
      }
    ]
  },
  {
    title: "Informações",
    links: [
      {
        link: "/blog/material-apoio",
        name: "Materiais de Apoio",
        fa: "building"
      }
    ]
  }
];
const Menu = () => (
    <>
      {navlinks.map(({ title, links }) => (
          <>
            <div className="sidebar-heading">{title}</div>
            {links.map((i) => (
                <>
                  <NavItemLink {...i} />
                  {/*<Divider {...i} />*/}
                </>
            ))}
          </>
      ))}
      <li className={`nav-item`}>
        <div className="sidebar-heading">{"Acompanhamento"}</div>
        <a
            className="nav-link"
            href="https://app.pipefy.com/request-tracker/"
            target="_blank"
            rel="noopener noreferrer"
        >
          <i className="fas fa-fw fa-address-card"></i>
          <span>Leads</span>
        </a>
      </li>

      {/*<div className="sidebar-heading">Simulação</div>*/}
      {/*/!* --- section --- *!/*/}
      {/*<NavItemLink*/}
      {/*    link={"/simulation/HE"}*/}
      {/*    name={"Simulação H.E."}*/}
      {/*    fa="landmark"*/}
      {/*/>*/}
      {/*<Divider clsx={"my-0"} />*/}
      {/*<NavItemLink*/}
      {/*    link={"/simulation/FI"}*/}
      {/*    name={"Simulação Finan."}*/}
      {/*    fa="hand-holding-usd"*/}
      {/*/>*/}
      {/*/!* --- section --- *!/*/}
      {/*<Divider />*/}
    </>
);
export const Sidebar = (props) => {
  const [width, height] = useWindowSize();
  const collapsed = width <= 480 ? " collapse" : "";
  const toogleActions = () => ({
    type: collapsed ? "fixed_toogled_close" : "fixed_toogled_open"
  });

  return (
        <ul
            className={`navbar-nav bg-gradient-primary sidebar sidebar-light accordion ${
                collapsed ? "toggled " : ""
            }`}
            id="accordionSidebar"
        >
          <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/protected"
          >
            <Row className="sidebar-brand-icon">
              <Col>
                Logo
              </Col>
            </Row>
          </a>
          <Divider clsx="my-0" />
          <Menu />
          <Divider clsx="d-none d-md-block" />

          <div className="text-center d-none d-md-inline">
            <button
                className="rounded-circle border-0"
                id="sidebarToggle"
                onClick={() => toogleActions()}
            />
          </div>
        </ul>
  );
};
