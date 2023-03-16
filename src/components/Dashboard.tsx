import { Container } from 'react-bootstrap';

interface DashboardProps {
  repoLink: string;
}

function Dashboard(props: DashboardProps) {
  return (
    <div>
      <Container>
        <p>Dashboard for {props.repoLink}</p>
      </Container>
    </div>
  );
}

export default Dashboard;
