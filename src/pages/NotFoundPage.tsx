import { Link } from "react-router-dom";
import { ReactComponent as Icon404 } from "../assets/icons/Icon404.svg";

export function NotFoundPage() {
  return (
    <div>
      <Icon404 height={500} />
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
