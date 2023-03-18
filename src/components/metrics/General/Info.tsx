interface Props {
  commits: number;
  pullRequests: number;
  branches: number;
}

function Info(props: Props) {
  return (
    <ul>
      <li>
        <strong>Commits:</strong> {props.commits}
      </li>
      <li>
        <strong>Pull Requests:</strong> {props.pullRequests}
      </li>
      <li>
        <strong>Branches:</strong> {props.branches}
      </li>
    </ul>
  );
}

export default Info;
