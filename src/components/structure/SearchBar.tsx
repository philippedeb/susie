import {
  Form,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../css/fade-in.css";

interface Props {
  onSearch: (value: string) => void;
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
  }

  function isValidUrl(url: string) {
    const regex =
      /^https:\/\/github.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}\/[a-z\d_.-]{1,256}$/i;
    return regex.test(url);
  }

  return (
    <>
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="Enter GitHub repository URL here"
          aria-label="Enter GitHub repository URL here"
          aria-describedby="basic-addon2"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              props.onSearch(searchValue);
            }
          }}
        />
        <Button variant="success" id="button-addon2" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>
      <div className="mt-2 w-75">
        {showWarning && (
          <Alert
            variant="danger"
            className="fade-in-up"
            dismissible
            onClose={() => setShowWarning(false)}
          >
            The URL must be in the format https://www.github.com/owner/repo.
          </Alert>
        )}
      </div>
    </>
  );
}

export default SearchBar;
