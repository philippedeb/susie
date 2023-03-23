import NotFound from "../NotFound";
import GuidePage from "./GuidePage";
import InclusiveLanguageGuide from "./InclusiveLanguageGuide";

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
    "inclusive-language": (
      <GuidePage title="Inclusive Language"><InclusiveLanguageGuide></InclusiveLanguageGuide></GuidePage>
    ),
    "programming-languages-efficiency": (
      <GuidePage title="Programming Languages">Work in progress..</GuidePage>
    ),
  };

  if (props.guideKey in guidePages) {
    return guidePages[props.guideKey];
  }
  return <NotFound item="guide" />;
}

export default GuidePages;
