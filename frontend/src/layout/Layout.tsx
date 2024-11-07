import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children  }: Props) => {
  return (
    <div className="min-h-screen flex">
     <Sidebar/>
      <div className="flex flex-col ">
      <Header />
      <div className="flex-1 ">
      {children}
      </div>
      <Footer />
      </div>

    </div>
  )
}

export default Layout
