import { Alert } from "react-bootstrap";
import DropDown from "../../structure/DropDown";
import { LanguageTooltips } from "./LanguageTooltips";

interface Props {
  languages: { [key: string]: number };
  threshold: number;
}

function analyseLanguage([language, usagePercentage]: [string, number]) {
  const tooltip = LanguageTooltips[language];
  return `${usagePercentage}% of your code is ${language}. ${tooltip}`;
}

function LanguageAdvise(props: Props) {
  const labels = Object.keys(props.languages);
  const data = Object.values(props.languages);

  const total = data.reduce((acc, curr) => acc + curr, 0);
  const percentages = data.map((value) => ((value / total) * 100).toFixed(2));

  const filteredLabels = labels
    .map((label, index) => [label, percentages[index]])
    .filter(([label, percentage]) => {
      // Only show languages that are above the threshold and have a tooltip
      return +percentage >= props.threshold && label in LanguageTooltips;
    });

  return (
    <>
      <h5 className="mt-3">Insights</h5>
      {filteredLabels.length == 0 ? (
        <Alert variant="success">
          You are using efficient languages, well done!
        </Alert>
      ) : (
        filteredLabels.map(([label, usagePercentage], index) => (
          <DropDown
            key={index}
            header={label}
            collapsed={false}
            children={<p>{analyseLanguage([label, +usagePercentage])}</p>}
          ></DropDown>
        ))
      )}
    </>
  );
}

export default LanguageAdvise;
