import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

interface DashboardProps {
  repoLink: string;
}

function Dashboard(props: DashboardProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";

  return (
    <div>
      <Container>
        <p>Dashboard for {searchValue}</p>
      </Container>
    </div>
  );
}

export default Dashboard;
