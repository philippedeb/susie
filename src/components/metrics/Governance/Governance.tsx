interface Props {
  hasReadme: boolean;
  hasLicense: boolean;
}

function Governance(props: Props) {
  return (
    <ul>
      <li>
        <strong>Readme:</strong> {props.hasReadme ? "✅" : "⛔"}
      </li>
      <li>
        <strong>License:</strong> {props.hasLicense ? "✅" : "⛔"}
      </li>
    </ul>
  );
}

export default Governance;
