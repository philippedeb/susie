import {
  Form,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getData } from "../logic/fetcher";

interface Props {
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
}

function SearchBar(props: Props) {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch() {
    props.onSearch(searchValue);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchValue(value);
    props.onChange(value);
  }

  return (
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
            placeholder="Paste GitHub URL here"
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
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Analyze</Tooltip>}>
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
  );
}

export default SearchBar;