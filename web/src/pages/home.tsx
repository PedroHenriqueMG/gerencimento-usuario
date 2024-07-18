import { TasksTable } from "../components/taskUsers/taskUsers";

export function Home() {
  return (
    <section className="flex flex-col items-center">
      <TasksTable />
    </section>
  );
}
