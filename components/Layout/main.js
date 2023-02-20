import Navbar from "../navbar";
import Footer from "../footer";

const Layout = ({ children }) => {
  return (
    <main className="container mx-auto px-5">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
