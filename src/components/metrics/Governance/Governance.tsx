import { useEffect, useState } from "react";

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
    <ul style={{ columns: "2" }}>
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
        <strong>Contributing:</strong> {props.contributing === "" ? "⛔" : "✅"}
      </li>
      <li key={6} title={"README.md"}>
        <strong>Issue Template:</strong>{" "}
        {props.issueTemplate === "" ? "⛔" : "✅"}
      </li>
      <li key={7} title={"PULL_REQUEST_TEMPLATE.md"}>
        <strong>Pull Request Template:</strong>{" "}
        {props.pullRequestTemplate === "" ? "⛔" : "✅"}
      </li>
      <li
        key={8}
        title={
          "energy statement, carbon footprint or sustainability is in readme/license"
        }
      >
        <strong>Addresses sustainability:</strong>{" "}
        {hasEnergyStatement ? "✅" : "⛔"}
      </li>
    </ul>
  );
}

export default Governance;
