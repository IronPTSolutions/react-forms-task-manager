import { PageLayout } from "../components/layouts";
import { TaskList } from "../components/tasks";

function HomePage() {
  return (
    <PageLayout>
      <TaskList />
    </PageLayout>
  )
}

export default HomePage;
