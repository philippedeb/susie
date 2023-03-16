import {
  Form,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../css/fade-in.css";

interface Props {
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

function SearchBar(props: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  function handleSearch() {
    if (isValidUrl(searchValue)) {
      props.onSearch(searchValue);
    } else {
      setShowWarning(true);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchValue(value);
    props.onChange(value);
  }

  function isValidUrl(url: string) {
    const regex =
      /^https:\/\/github.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}\/[a-z\d_.-]{1,256}$/i;
    return regex.test(url);
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <Form className="d-flex">
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                Enter a GitHub repository URL to analyze sustainability
              </Tooltip>
            }
          >
            <FormControl
              type="text"
              placeholder="Enter GitHub repository URL here"
              className="rounded-pill bg-white text-dark border-0 shadow-sm w-100 mr-2"
              style={{
                maxWidth: "90%",
                minWidth: "400px",
                borderColor: "#757167",
                borderWidth: "medium",
              }}
              value={searchValue}
              onChange={handleChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  props.onSearch(searchValue);
                }
              }}
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Analyze</Tooltip>}
          >
            <Button
              onClick={handleSearch}
              variant="secondary"
              className="rounded-pill"
              style={{ backgroundColor: "#757167", marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </OverlayTrigger>
        </Form>
      </div>
      <div className="mt-2">
        {showWarning && (
          <Alert
            variant="danger"
            className="fade-in-up"
            dismissible
            onClose={() => setShowWarning(false)}
          >
            Please enter a valid GitHub repository URL
            (https://www.github.com/owner/repo).
          </Alert>
        )}
      </div>
    </>
  );
}

export default SearchBar;
