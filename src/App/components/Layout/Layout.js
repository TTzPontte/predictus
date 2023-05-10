import { Outlet } from "react-router-dom";
import * as React from "react";
import TopNavbar from "../TopNavbar/TopNavbar";
import { Sidebar } from "../Sidebar/Sidebar";

function Layout() {
  return (
    <>
      <>
        {/*<div style={{height: "100vh"}}>*/}
        <div id="wrapper" className="main-content-wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column" style={{ height: "100%" }}>
            <div id="content" style={{ height: "100%" }}>
              <TopNavbar currentUser={{ email: "lucas@pontte.com.br" }} />
              <section style={{ height: "100%", width: "100%" }}>
                <Outlet />
              </section>
            </div>
          </div>
        </div>
        {/*</div>*/}
      </>
    </>
  );
}

export default Layout;
