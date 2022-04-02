import { Outlet, Link, useParams } from "react-router-dom";
import { capitalCase } from "change-case";
import {
  Sidebar,
  SidebarItem,
  SidebarLayout,
  Logo,
  Content,
} from "@fwoosh/components";
import { modules } from "./utils/get-docs";

import "../../app/src/index.css";

export const App = () => {
  const params = useParams<{ page: string }>();

  return (
    <SidebarLayout>
      <Sidebar>
        <Link to="/">
          <Logo>
            <img src="/logo-2.svg" alt="fwoosh" />
          </Logo>
        </Link>
        {Object.keys(modules).map((name) => (
          <Link key={name} to={name}>
            <SidebarItem aria-selected={name === params.page}>
              {capitalCase(name)}
            </SidebarItem>
          </Link>
        ))}
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </SidebarLayout>
  );
};
