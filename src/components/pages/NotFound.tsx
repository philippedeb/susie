import "../../css/NotFound.css";

interface NotFoundProps {
  item: string;
}

function NotFound(props: NotFoundProps) {
  return (
    <div className="not-found">
      <p className="not-found-text">
        Sorry, we could not find the {props.item} you were looking for... 💚
      </p>
    </div>
  );
}

export default NotFound;
