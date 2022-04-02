import { components, css, styled } from "@fwoosh/components";

const Slogan = styled("h2", {
  text: "2xl",
  color: "$gray10",
});

const Hero = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",
  alignItems: "center",
  padding: "$28",
  border: "1px solud $gray4",
});

export const Home = () => {
  return (
    <div>
      <Hero>
        <img src="/logo-2.svg" alt="fwoosh" />
        <Slogan>A lightening quick storybook alternative.</Slogan>
      </Hero>

      <div>
        <components.p>
          A modern rewrite of storybook powered by bleeding edge web technology.
        </components.p>

        <components.ul>
          <components.li>
            Compatible with with Storybook Component Format
          </components.li>
          <components.li>
            All your favorite storybook features: docs, action, and knobs
          </components.li>
          <components.li>Simple configuration</components.li>
          <components.li>
            Sub-second dev mode startup powered by Vite
          </components.li>
          <components.li>Fully themeable</components.li>
          <components.li>
            Plugin system where you can add framework support, UI addons, and
            more!
          </components.li>
        </components.ul>
      </div>
    </div>
  );
};
