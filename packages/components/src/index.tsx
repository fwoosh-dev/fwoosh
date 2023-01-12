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
import type { Components } from "./components.js";
import { components as componentsDefault } from "./components.js";

const components = {
  h1: (overrides.h1 || componentsDefault.h1) as typeof componentsDefault["h1"],
  h2: (overrides.h2 || componentsDefault.h2) as typeof componentsDefault["h2"],
  h3: (overrides.h3 || componentsDefault.h3) as typeof componentsDefault["h3"],
  h4: (overrides.h4 || componentsDefault.h4) as typeof componentsDefault["h4"],
  h5: (overrides.h5 || componentsDefault.h5) as typeof componentsDefault["h5"],
  h6: (overrides.h6 || componentsDefault.h6) as typeof componentsDefault["h6"],
  hr: (overrides.hr || componentsDefault.hr) as typeof componentsDefault["hr"],
  p: (overrides.p || componentsDefault.p) as typeof componentsDefault["p"],
  code: (overrides.code ||
    componentsDefault.code) as typeof componentsDefault["code"],
  pre: (overrides.pre ||
    componentsDefault.pre) as typeof componentsDefault["pre"],
  a: (overrides.a || componentsDefault.a) as typeof componentsDefault["a"],
  ul: (overrides.ul || componentsDefault.ul) as typeof componentsDefault["ul"],
  ol: (overrides.ol || componentsDefault.ol) as typeof componentsDefault["ol"],
  li: (overrides.li || componentsDefault.li) as typeof componentsDefault["li"],
  blockquote: (overrides.blockquote ||
    componentsDefault.blockquote) as typeof componentsDefault["blockquote"],
  table: (overrides.table ||
    componentsDefault.table) as typeof componentsDefault["table"],
  th: (overrides.th || componentsDefault.th) as typeof componentsDefault["th"],
  tr: (overrides.tr || componentsDefault.tr) as typeof componentsDefault["tr"],
  td: (overrides.td || componentsDefault.td) as typeof componentsDefault["td"],
  img: (overrides.img ||
    componentsDefault.img) as typeof componentsDefault["img"],
};

const QuickNav = {
  Root: (overrides.QuickNavDefault?.Root ||
    QuickNavDefault.Root) as typeof QuickNavDefault.Root,
  Header: (overrides.QuickNavDefault?.Header ||
    QuickNavDefault.Header) as typeof QuickNavDefault.Header,
  Title: (overrides.QuickNavDefault?.Title ||
    QuickNavDefault.Title) as typeof QuickNavDefault.Title,
  Item: (overrides.QuickNavDefault?.Item ||
    QuickNavDefault.Item) as typeof QuickNavDefault.Item,
  Group: (overrides.QuickNavDefault?.Group ||
    QuickNavDefault.Group) as typeof QuickNavDefault.Group,
  Link: (overrides.QuickNavDefault?.Link ||
    QuickNavDefault.Link) as typeof QuickNavDefault.Link,
};

const Toolbar = {
  Root: (overrides.Toolbar?.Root ||
    ToolbarDefault.Root) as typeof ToolbarDefault.Root,
  Button: (overrides.Toolbar?.Button ||
    ToolbarDefault.Button) as typeof ToolbarDefault.Button,
  Separator: (overrides.Toolbar?.Separator ||
    ToolbarDefault.Separator) as typeof ToolbarDefault.Separator,
};

const Command = {
  Dialog: (overrides.Command?.Dialog ||
    CommandDefault.Dialog) as typeof CommandDefault.Dialog,
  Content: (overrides.Command?.Content ||
    CommandDefault.Content) as typeof CommandDefault.Content,
  Group: (overrides.Command?.Group ||
    CommandDefault.Group) as typeof CommandDefault.Group,
  Separator: (overrides.Command?.Separator ||
    CommandDefault.Separator) as typeof CommandDefault.Separator,
  Empty: (overrides.Command?.Empty ||
    CommandDefault.Empty) as typeof CommandDefault.Empty,
  Input: (overrides.Command?.Input ||
    CommandDefault.Input) as typeof CommandDefault.Input,
  Item: (overrides.Command?.Item ||
    CommandDefault.Item) as typeof CommandDefault.Item,
  List: (overrides.Command?.List ||
    CommandDefault.List) as typeof CommandDefault.List,
  Loading: (overrides.Command?.Loading ||
    CommandDefault.Loading) as typeof CommandDefault.Loading,
  Heading: (overrides.Command?.Heading ||
    CommandDefault.Heading) as typeof CommandDefault.Heading,
};

const Tabs = {
  Root: (overrides.Tabs?.Root || TabsDefault.Root) as typeof TabsDefault.Root,
  List: (overrides.Tabs?.List || TabsDefault.List) as typeof TabsDefault.List,
  Content: (overrides.Tabs?.Content ||
    TabsDefault.Content) as typeof TabsDefault.Content,
  Trigger: (overrides.Tabs?.Trigger ||
    TabsDefault.Trigger) as typeof TabsDefault.Trigger,
};

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
};
