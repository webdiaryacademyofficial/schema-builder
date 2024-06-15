import "./app.scss"
import Container from "./components/Container/Container";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import LayoutWrapper from "./components/LayoutWrapper/LayoutWrapper";

function App() {
  return (
    <Layout>
      <Container>
        <LayoutWrapper>
          <Sidebar>Sidebar</Sidebar>
          <Main>Main</Main>
        </LayoutWrapper>
      </Container>
    </Layout>
  );
}

export default App;
