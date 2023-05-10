import { Link } from "react-router-dom";
import React from "react";
import OffcanvasSidebar from "../../pages/private/Home/OffcanvasSidebar/OffcanvasSidebar";
import NavProvider from "./NavProvider";
import useWindowSize from "../Hooks/usewindowSize";
import { Navbar } from "react-bootstrap";
import Logo from "../Logo/Logo";

const NavItemLink = ({ name, link, fa = "", active = "" }) => (
  <li className={`nav-item ${active}`}>
    {!fa && <i className={fa} />}
    <Link className="nav-link" to={link}>
      <i className={`fas fa-fw fa-${fa}`} />
      <span>{name}</span>
    </Link>
  </li>
);
const Divider = ({ clsx }) => <hr className={`sidebar-divider ${clsx}`} />;

const HeaderIcon = ({ children }) => (
  <div className="sidebar-brand-icon rotate-n-15">{children}</div>
);
const HeaderTitle = ({ children }) => (
  <div className="sidebar-brand-text mx-3">{children}</div>
);

const SidebarHeader = ({ children }) => (
  <>
    <Navbar.Brand
        justified={"center"}
      className="sidebar-brand d-flex align-items-center justify-content-center"
      href="/protected"
    >
      {children && <>{children}</>}
    </Navbar.Brand>
    <Divider clsx="my-0" />
  </>
);

const Menu = () => (
  <>
    <div className="sidebar-heading">Ferramentas</div>

    <NavItemLink
      link={"/simulation/HE"}
      name={"Simulação H.E."}
      fa="landmark"
    />
    <NavItemLink
      link={"/simulation/FI"}
      name={"Simulação Finan."}
      fa="hand-holding-usd"
    />

    <Divider />

    <NavItemLink link={"/blog/material-apoio"} name={"Materiais de Apoio"} fa="building" />
  </>
);
const FixedSidebar = ({ toogled , setState}) => {
  const [width, height] = useWindowSize();
  const collapsed = width <= 480 ? " collapse" : "";
  console.log({ collapsed });
  return (
    <>
      <Navbar bg={"gradient-brand-pontte"} sidebar={"sidebar-light"}
        className={`navbar-nav bg-gradient-brand-pontte sidebar sidebar-light accordion ${collapsed}`}
        id="accordionSidebar"
      >
        <SidebarHeader>
          <HeaderTitle>
            <Logo color="#5c3b6b" />
          </HeaderTitle>
        </SidebarHeader>
        <ul className="my-2">
          <Menu />
        </ul>
        <Divider clsx="d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" onClick={()=>setState({type:"fixed_toogled_close"})} />
        </div>
      </Navbar>
    </>
  );
};
export const Sidebar = (props) => {
  return (
    <>
      <NavProvider>
        {({ show, state: { fixed, offCanvas, toogled }, setState }) => (
          <>
            {fixed && <FixedSidebar toogled={toogled} setState={setState} />}
            {!fixed && offCanvas && <OffcanvasSidebar openned={show} />}
          </>
        )}
      </NavProvider>
    </>
  );
};
