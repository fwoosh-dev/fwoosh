import { Outlet, Link, useParams } from "react-router-dom";
import { capitalCase } from "change-case";
import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  Logo,
  Content,
  darkTheme,
} from "@fwoosh/components";
import { modules } from "./utils/get-docs";

export const App = () => {
  const params = useParams<{ page: string }>();

  return (
    <SidebarLayout className={darkTheme}>
      <Sidebar>
        <Link to="/">
          <Logo>
            <picture>
              <source src="/logo-2.svg" media="(prefers-color-scheme: light)" />
              <img src="/logo-dark.svg" alt="fwoosh" />
            </picture>
          </Logo>
        </Link>
        <SidebarItems>
          {Object.keys(modules).map((name) => (
            <Link key={name} to={name}>
              <SidebarItem aria-selected={name === params.page}>
                {capitalCase(name)}
              </SidebarItem>
            </Link>
          ))}
        </SidebarItems>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </SidebarLayout>
  );
};
