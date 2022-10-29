const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex justify-center items-center p-4 text-center text-zinc-400 text-sm">
      <span>© All rights reserved {year}</span>
    </div>
  );
};

export default Footer;
