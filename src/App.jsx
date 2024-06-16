import "./App.scss";
import Container from "./components/Container/Container";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import LayoutWrapper from "./components/LayoutWrapper/LayoutWrapper";
import SidebarTree from "./components/SidebarTree/SidebarTree";

function App() {
  return (
    <Layout>
      <Container>
        <LayoutWrapper>
          <Sidebar>
            <SidebarTree />
          </Sidebar>
          <Main />
        </LayoutWrapper>
      </Container>
    </Layout>
  );
}

export default App;
