import * as overrides from "@fwoosh/app/overrides";

import { StyledMarkdown } from "./StyledMarkdown.js";
import { DelayedRender, Spinner as SpinnerDefault } from "./Spinner.js";
import {
  HeaderBar as HeaderBarDefault,
  HeaderTitle as HeaderTitleDefault,
} from "./HeaderBar.js";
import { PropsTable as PropsTableDefault } from "./PropsTable.js";
import { ErrorBoundary as ErrorBoundaryDefault } from "./ErrorBoundary.js";
import {
  AppWrapper as AppWrapperDefault,
  Content as ContentDefault,
  DocsLayout as DocsLayoutDefault,
  IconButton as IconButtonDefault,
  Logo as LogoDefault,
  PageWrapper as PageWrapperDefault,
} from "./Layout.js";
import {
  Sidebar as SidebarDefault,
  SidebarActiveDot as SidebarActiveDotDefault,
  SidebarFolderOpenIndicator as SidebarFolderOpenIndicatorDefault,
  SIDEBAR_ITEM_INDENT as SIDEBAR_ITEM_INDENTDefault,
  SidebarFolderOpenIndicatorWrapper as SidebarFolderOpenIndicatorWrapperDefault,
  SidebarItem as SidebarItemDefault,
  SidebarItems as SidebarItemsDefault,
  SidebarLayout as SidebarLayoutDefault,
  SidebarSectionTitle as SidebarSectionTitleDefault,
} from "./Sidebar.js";
import { ChevronRightIcon as ChevronRightIconDefault } from "./icons/index.js";
import * as ToolbarDefault from "./Toolbar.js";
import * as TabsDefault from "./Tabs.js";
import * as QuickNavDefault from "./QuickNav.js";
import * as CommandDefault from "./Command.js";
import * as DropdownMenuDefault from "./DropdownMenu.js";
import * as SelectDefault from "./Select.js";
import { Tooltip as TooltipDefault } from "./Tooltip.js";
import type { Components } from "./components.js";
import { components as componentsDefault } from "./components.js";

const components = {
  ...componentsDefault,
  ...overrides,
} as typeof componentsDefault;

const Select = {
  ...SelectDefault,
  ...overrides.Select,
} as typeof SelectDefault;

const DropdownMenu = {
  ...DropdownMenuDefault,
  ...overrides.DropdownMenu,
} as typeof DropdownMenuDefault;

const QuickNav = {
  ...QuickNavDefault,
  ...overrides.QuickNav,
} as typeof QuickNavDefault;

const Toolbar = {
  ...ToolbarDefault,
  ...overrides.Toolbar,
} as typeof ToolbarDefault;

const Command = {
  ...CommandDefault,
  ...overrides.Command,
} as typeof CommandDefault;

const Tabs = {
  ...TabsDefault,
  ...overrides.Tabs,
} as typeof TabsDefault;

const ChevronRightIcon = overrides.ChevronRightIcon || ChevronRightIconDefault;

const Spinner = (overrides.Spinner || SpinnerDefault) as typeof SpinnerDefault;
const PropsTable = (overrides.PropsTable ||
  PropsTableDefault) as typeof PropsTableDefault;
const ErrorBoundary = (overrides.ErrorBoundary ||
  ErrorBoundaryDefault) as typeof ErrorBoundaryDefault;
const AppWrapper = (overrides.AppWrapper ||
  AppWrapperDefault) as typeof AppWrapperDefault;
const Content = (overrides.Content || ContentDefault) as typeof ContentDefault;
const DocsLayout = (overrides.DocsLayout ||
  DocsLayoutDefault) as typeof DocsLayoutDefault;
const IconButton = (overrides.IconButton ||
  IconButtonDefault) as typeof IconButtonDefault;
const Logo = (overrides.Logo || LogoDefault) as typeof LogoDefault;
const PageWrapper = (overrides.PageWrapper ||
  PageWrapperDefault) as typeof PageWrapperDefault;
const Tooltip = (overrides.Tooltip || TooltipDefault) as typeof TooltipDefault;

const HeaderBar = (overrides.HeaderBar ||
  HeaderBarDefault) as typeof HeaderBarDefault;
const HeaderTitle = (overrides.HeaderTitle ||
  HeaderTitleDefault) as typeof HeaderTitleDefault;

const Sidebar = (overrides.Sidebar || SidebarDefault) as typeof SidebarDefault;
const SidebarActiveDot = (overrides.SidebarActiveDot ||
  SidebarActiveDotDefault) as typeof SidebarActiveDotDefault;
const SidebarFolderOpenIndicator = (overrides.SidebarFolderOpenIndicator ||
  SidebarFolderOpenIndicatorDefault) as typeof SidebarFolderOpenIndicatorDefault;
const SIDEBAR_ITEM_INDENT = (overrides.SIDEBAR_ITEM_INDENT ||
  SIDEBAR_ITEM_INDENTDefault) as typeof SIDEBAR_ITEM_INDENTDefault;
const SidebarFolderOpenIndicatorWrapper = (overrides.SidebarFolderOpenIndicatorWrapper ||
  SidebarFolderOpenIndicatorWrapperDefault) as typeof SidebarFolderOpenIndicatorWrapperDefault;
const SidebarItem = (overrides.SidebarItem ||
  SidebarItemDefault) as typeof SidebarItemDefault;
const SidebarItems = (overrides.SidebarItems ||
  SidebarItemsDefault) as typeof SidebarItemsDefault;
const SidebarLayout = (overrides.SidebarLayout ||
  SidebarLayoutDefault) as typeof SidebarLayoutDefault;
const SidebarSectionTitle = (overrides.SidebarSectionTitle ||
  SidebarSectionTitleDefault) as typeof SidebarSectionTitleDefault;

export {
  Tabs,
  Toolbar,
  QuickNav,
  ChevronRightIcon,
  StyledMarkdown,
  ErrorBoundary,
  Sidebar,
  SidebarActiveDot,
  SidebarFolderOpenIndicator,
  SIDEBAR_ITEM_INDENT,
  SidebarFolderOpenIndicatorWrapper,
  SidebarItem,
  SidebarItems,
  SidebarLayout,
  SidebarSectionTitle,
  DelayedRender,
  Spinner,
  HeaderBar,
  HeaderTitle,
  PropsTable,
  AppWrapper,
  Content,
  DocsLayout,
  IconButton,
  Logo,
  PageWrapper,
  Components,
  components,
  Command,
  Tooltip,
  DropdownMenu,
  Select,
};
