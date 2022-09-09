const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center p-4 text-center text-gray-500 text-sm">
      <span>© All rights reserved {year}</span>
    </div>
  );
};

export default Footer;
