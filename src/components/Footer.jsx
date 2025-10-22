function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-10 border-t ">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-800">Chill Fit</span>. All
        rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
