import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import DropDown from "../../structure/DropDown";

interface Props {
  readme: string;
  license: string;
  changeLog: string;
  codeOfConduct: string;
  contributing: string;
  issueTemplate: string;
  pullRequestTemplate: string;
  communityProfile: any;
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

  const communityProfile = props.communityProfile !== null;
  const communityProfileHealthPercentage =
    communityProfile &&
    "health_percentage" in props.communityProfile &&
    props.communityProfile.health_percentage !== null;
  const communityProfileDocumentation =
    communityProfile &&
    "documentation" in props.communityProfile &&
    props.communityProfile.documentation !== null;
  const communityProfileFiles =
    communityProfile &&
    "files" in props.communityProfile &&
    props.communityProfile.files !== null;
  const communityProfileReadme =
    communityProfileFiles &&
    "readme" in props.communityProfile.files &&
    props.communityProfile.files.readme !== null;
  const communityProfileLicense =
    communityProfileFiles &&
    "license" in props.communityProfile.files &&
    props.communityProfile.files.license !== null;
  const communityProfileCodeOfConduct =
    communityProfileFiles &&
    "code_of_conduct_file" in props.communityProfile.files &&
    props.communityProfile.files.code_of_conduct_file !== null;
  const communityProfileContributing =
    communityProfileFiles &&
    "contributing" in props.communityProfile.files &&
    props.communityProfile.files.contributing !== null;
  const communityProfileIssueTemplate =
    communityProfileFiles &&
    "issue_template" in props.communityProfile.files &&
    props.communityProfile.files.issue_template !== null;
  const communityProfilePullRequestTemplate =
    communityProfileFiles &&
    "pull_request_template" in props.communityProfile.files &&
    props.communityProfile.files.pull_request_template !== null;

  const includedGovernance: JSX.Element = (
    <>
      <h6>
        ➡️ The repository <b>includes</b> the following:
      </h6>
      <ul>
        {communityProfileDocumentation && (
          <li key={0}>
            <a
              href={props.communityProfile.documentation}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {communityProfileReadme && (
          <li key={1}>
            <a
              href={props.communityProfile.files.readme.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Readme <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {communityProfileLicense && (
          <li key={2}>
            <a
              href={props.communityProfile.files.license.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              License <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>{" "}
            ({props.communityProfile.files.license.name})
          </li>
        )}
        {communityProfileCodeOfConduct && (
          <li key={3}>
            <a
              href={props.communityProfile.files.code_of_conduct_file.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {communityProfileContributing && (
          <li key={4}>
            <a
              href={props.communityProfile.files.contributing.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contributing <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {communityProfileIssueTemplate && (
          <li key={5}>
            <a
              href={props.communityProfile.files.issue_template.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Issue Template <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {communityProfilePullRequestTemplate && (
          <li key={6}>
            <a
              href={props.communityProfile.files.pull_request_template.html_url}
              className="susie-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pull Request Template <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        )}
        {props.changeLog !== "" && <li key={7}>Changelog</li>}
      </ul>
    </>
  );

  const excludedGovernance: JSX.Element = (
    <>
      <h6>
        ➡️ The repository seems to <b>miss</b> the following:
      </h6>
      <ul>
        {!communityProfileDocumentation && <li key={0}>Website</li>}
        {!communityProfileReadme && <li key={1}>Readme</li>}
        {!communityProfileLicense && <li key={2}>License</li>}
        {!communityProfileCodeOfConduct && <li key={3}>Code of Conduct</li>}
        {!communityProfileContributing && <li key={4}>Contributing</li>}
        {!communityProfileIssueTemplate && <li key={5}>Issue Template</li>}
        {!communityProfilePullRequestTemplate && (
          <li key={6}>Pull Request Template</li>
        )}
        {props.changeLog === "" && <li key={7}>Changelog</li>}
      </ul>
    </>
  );

  const scoreGovernance: JSX.Element = (
    <>
      <h5 className="mb-3">
        Governance Score:{" "}
        <Badge
          bg={
            communityProfileHealthPercentage
              ? props.communityProfile.health_percentage < 40
                ? "danger"
                : props.communityProfile.health_percentage < 75
                ? "primary"
                : "success"
              : "secondary"
          }
        >
          {communityProfileHealthPercentage
            ? props.communityProfile.health_percentage
            : "N/A"}
        </Badge>
      </h5>
    </>
  );

  const somethingIsIncluded =
    communityProfileDocumentation ||
    communityProfileReadme ||
    communityProfileLicense ||
    communityProfileCodeOfConduct ||
    communityProfileContributing ||
    communityProfileIssueTemplate ||
    communityProfilePullRequestTemplate ||
    props.changeLog !== "";

  const somethingIsExcluded =
    !communityProfileDocumentation ||
    !communityProfileReadme ||
    !communityProfileLicense ||
    !communityProfileCodeOfConduct ||
    !communityProfileContributing ||
    !communityProfileIssueTemplate ||
    !communityProfilePullRequestTemplate ||
    props.changeLog === "";

  return (
    <>
      <p>
        Make more informed decisions about which projects to contribute to or
        use in your own work by looking at the commitment of a repository to
        sustainability.
      </p>

      {scoreGovernance}
      {somethingIsIncluded && includedGovernance}
      {somethingIsExcluded && excludedGovernance}
      {hasEnergyStatement ? (
        <h6>➡️ The repository addresses environmental sustainability 👌</h6>
      ) : (
        <h6>
          ➡️ The repository does not seem to address environmental
          sustainability ⛔
        </h6>
      )}
      <hr />
      <DropDown header={"How is the score calculated? 🧮"} collapsed={true}>
        <p>
          Based on the components present in a GitHub's community profile, the
          GitHub API can return this health percentage for any repository. The
          score is between 0 and 100. Below, you can find more details on which
          components are present or absent in the repository.
        </p>
      </DropDown>
      <DropDown
        header="When does a project address sustainability? 💭"
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
          <a
            href="https://github.com/philippedeb/susie"
            className="susie-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-source repository
          </a>
          !
        </p>
      </DropDown>
    </>
  );
}

export default Governance;
