import Header from "./Header";
import Sidebar from "./Sidebar"

function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>
          <h1>Devflow</h1>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;