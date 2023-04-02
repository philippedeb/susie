import { useState } from "react";
import { Collapse } from "react-bootstrap";
import "../../../css/Recommendation.css";

interface Props {
  title: string;
  replacements: string[];
  locations: [string, string][];
}

function Recommendation(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="recommendation-container">
      <div className="recommendation-header" onClick={toggleDropdown}>
        <h6>
          {props.title}{" "}
          {props.replacements.length > 0
            ? " → " + props.replacements.join(", ")
            : ""}
        </h6>
      </div>
      <Collapse in={isOpen}>
        <div className="recommendation-body">
          <p>
            {props.replacements.length > 0
              ? 'The term "' +
                props.title +
                '" was located in the following places:'
              : "Located in the following places:"}
          </p>
          <ul>
            {props.locations.map((item, index) => (
              <li key={index} className="mt-2">
                {displayItemType(item)}
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}

function displayItemType(entry: [string, string]): string {
  const [item_type, item] = entry;
  switch (item_type) {
    case "branch":
      return "🌳 Branch: " + item;
    case "changelog":
      return "📋 Changelog";
    case "license":
      return "⚖️ License";
    case "code_of_conduct":
      return "📜 Code of Conduct";
    case "contributing":
      return "🤝 Contributing guidelines";
    case "readme":
      return "📖 Readme";
    case "issue":
      return "🚩 Issue: " + item;
    case "issue_template":
      return "🗺️ Issue Template";
    case "commit_message":
      return "🔗 Commit: " + item;
    case "workflow":
      return "🏃 Workflow: " + item;
    case "pull_request":
      return "🔀 Pull Request: " + item;
    case "pull_request_template":
      return "🗺️ Pull Request Template";
  }
  return "(❔) " + item_type + ": " + item;
}

export default Recommendation;
