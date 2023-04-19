import { Alert } from "react-bootstrap";
import DropDown from "../../structure/DropDown";
import LanguageAdvise from "./LanguageAdvise";
import LanguagePiechart from "./LanguagePiechart";

interface ProgrammingLanguageProps {
  languages: { [key: string]: number };
}

function detailedAnalysis(languages: { [key: string]: number }) {
  return (
    <>
      <DropDown header={"Tech Stack of the Repository 💻"} collapsed={false}>
        <LanguagePiechart languages={languages} />
      </DropDown>
      <LanguageAdvise languages={languages} threshold={20.0} />
    </>
  );
}

function noLanguagesFound() {
  return (
    <Alert variant="success">
      No languages found.. Perhaps, the highest achievement of efficiency! 👑{" "}
    </Alert>
  );
}

function ProgrammingLanguage(props: ProgrammingLanguageProps) {
  return (
    <>
      <p>
        Did you know that your choice of programming language can have an
        enviromental impact? 🌱
        <br /> Read more about the topic in{" "}
        <a
          className="susie-link"
          href="./#/guide?name=inclusive-language"
          target="_blank"
          rel="noopener noreferrer"
        >
          this guide
        </a>{" "}
        or look at what Susie has found:
      </p>

      {Object.keys(props.languages).length > 0
        ? detailedAnalysis(props.languages)
        : noLanguagesFound()}
    </>
  );
}

export default ProgrammingLanguage;
