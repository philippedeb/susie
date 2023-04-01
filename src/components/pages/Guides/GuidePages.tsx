import NotFound from "../NotFound";
import GuidePage from "./GuidePage";
import EnergyConsumptionGuide from "./EnergyConsumptionGuide";
import InclusiveLanguageGuide from "./InclusiveLanguageGuide";
import TypesOfSustainabilityGuide from "./TypesOfSustainabilityGuide";

interface GuidePagesProps {
  guideKey: string;
}

type GuidePages = {
  [key: string]: JSX.Element;
};

function GuidePages(props: GuidePagesProps) {
  // All the guides! 📚
  // Instruction: add a guide by adding a new key-value pair with the key being the guideKey and the value being the guide page.
  const guidePages: GuidePages = {
    "types-of-sustainability": (
      <GuidePage title="Sustainability Types">
        <TypesOfSustainabilityGuide />
      </GuidePage>
    ),
    "inclusive-language": (
      <GuidePage title="Inclusive Language">
        <InclusiveLanguageGuide />
      </GuidePage>
    ),
    "programming-languages": (
      <GuidePage title="Programming Languages">
        <EnergyConsumptionGuide />
      </GuidePage>
    ),
  };

  if (props.guideKey in guidePages) {
    return guidePages[props.guideKey];
  }
  return <NotFound item="guide" />;
}

export default GuidePages;
