import { useEffect, useState } from "react";
import DropDown from "../../structure/DropDown";

interface Props {
  readme: string;
  license: string;
  changeLog: string;
  codeOfConduct: string;
  contributing: string;
  issueTemplate: string;
  pullRequestTemplate: string;
}

function Governance(props: Props) {
  const [hasEnergyStatement, setHasEnergyStatement] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 800);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check for energy statement keywords in readme and license files
    const text = props.readme.toLowerCase() + props.license.toLowerCase();
    if (
      text.includes("energy statement") ||
      text.includes("carbon footprint") ||
      text.includes("sustainability") ||
      text.includes("environmental impact") ||
      text.includes("carbon emission") ||
      text.includes("CO2 emission") ||
      text.includes("sustainable") ||
      text.includes("biodegradable") ||
      text.includes("recyclable") ||
      text.includes("recycling") ||
      text.includes("carbon offset") ||
      text.includes("carbon neutral") ||
      text.includes("carbon positive") ||
      text.includes("climate action") ||
      text.includes("climate change") ||
      text.includes("circular economy") ||
      text.includes("e-waste") ||
      text.includes("paris agreement") ||
      text.includes("zero waste") ||
      text.includes("zero carbon") ||
      text.includes("energy efficiency") ||
      text.includes("energy consumption") ||
      text.includes("energy saving") ||
      text.includes("ecological footprint") ||
      text.includes("ecological impact") ||
      text.includes("leed certification") ||
      text.includes("landfill-free") ||
      text.includes("pollution") ||
      text.includes("organic") ||
      text.includes("waste-to-profit") ||
      text.includes("waste-to-energy")
    ) {
      setHasEnergyStatement(true);
    }
  }, [props.readme, props.license]);

  return (
    <>
      <p>
        Make more informed decisions about which projects to contribute to or
        use in your own work by looking at the commitment of a repository to
        sustainability.
      </p>
      <ul style={{ columns: isMobile ? "1" : "2" }}>
        <li key={1} title={"README.md"}>
          <strong>Readme:</strong> {props.readme === "" ? "⛔" : "✅"}
        </li>
        <li key={2} title={"LICENSE"}>
          <strong>License:</strong> {props.license === "" ? "⛔" : "✅"}
        </li>
        <li key={3} title={"CHANGELOG.md"}>
          <strong>Changelog:</strong> {props.changeLog === "" ? "⛔" : "✅"}
        </li>
        <li key={4} title={"CODE_OF_CONDUCT.md"}>
          <strong>Code of Conduct:</strong>{" "}
          {props.codeOfConduct === "" ? "⛔" : "✅"}
        </li>
        <li key={5} title={"CONTRIBUTING.md"}>
          <strong>Contributing:</strong>{" "}
          {props.contributing === "" ? "⛔" : "✅"}
        </li>
        <li key={6} title={"README.md"}>
          <strong>Issue Template:</strong>{" "}
          {props.issueTemplate === "" ? "⛔" : "✅"}
        </li>
        <li key={7} title={"PULL_REQUEST_TEMPLATE.md"}>
          <strong>Pull Request Template:</strong>{" "}
          {props.pullRequestTemplate === "" ? "⛔" : "✅"}
        </li>
        <li key={8} title={"Keyterms in README.md"}>
          <strong>Addresses sustainability:</strong>{" "}
          {hasEnergyStatement ? "✅" : "⛔"}
        </li>
      </ul>
      <DropDown
        header="💭 When does a project address sustainability?"
        collapsed={true}
      >
        <p>
          Currently, Susie checks the <b>README.md</b> for certain phrases. The
          data is based on the most popular search terms and glossaries of
          sustainability terms and definitions. Note, this is not an exhaustive
          list:
        </p>
        <ul style={{ listStyleType: "circle", columns: isMobile ? "1" : "2" }}>
          <li>biodegradable</li>
          <li>carbon emission</li>
          <li>carbon footprint</li>
          <li>carbon neutral</li>
          <li>carbon offset</li>
          <li>carbon positive</li>
          <li>circular economy</li>
          <li>climate action</li>
          <li>climate change</li>
          <li>CO2 emission</li>
          <li>ecological footprint</li>
          <li>ecological impact</li>
          <li>energy consumption</li>
          <li>energy efficiency</li>
          <li>energy saving</li>
          <li>energy statement</li>
          <li>e-waste</li>
          <li>environmental impact</li>
          <li>landfill-free</li>
          <li>leed certification</li>
          <li>organic</li>
          <li>paris agreement</li>
          <li>pollution</li>
          <li>recyclable</li>
          <li>recycling</li>
          <li>sustainable</li>
          <li>sustainability</li>
          <li>waste-to-energy</li>
          <li>waste-to-profit</li>
          <li>zero carbon</li>
          <li>zero waste</li>
        </ul>
        <p>
          If you want to help improving Susie by implementing NLP to detect
          sustainability statements, please contribute to our{" "}
          <a href="https://github.com/philippedeb/susie" className="susie-link">
            open-source repository
          </a>
          !
        </p>
      </DropDown>
    </>
  );
}

export default Governance;
