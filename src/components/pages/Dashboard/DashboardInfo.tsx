import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { extractGitHubOwnerAndRepo } from "../../../logic/fetcher";

interface Props {
  repoLink: string;
}

function DashboardInfo(props: Props) {
  const [owner, repo] = extractGitHubOwnerAndRepo(props.repoLink);

  return (
    <div className="dashboard-info text-center my-4">
      <h1>Dashboard</h1>
      <h5>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Repository Name</Tooltip>}
        >
          <span role="img" aria-label="repo">
            📁
          </span>
        </OverlayTrigger>{" "}
        {repo}{" "}
        <OverlayTrigger placement="top" overlay={<Tooltip>Owner</Tooltip>}>
          <span role="img" aria-label="owner">
            🛠️
          </span>
        </OverlayTrigger>{" "}
        {owner}
      </h5>
    </div>
  );
}

export default DashboardInfo;
