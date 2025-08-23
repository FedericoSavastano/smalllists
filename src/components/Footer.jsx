import ShareComponent from "./ShareComponent";
import ResetComponent from "./ResetComponent";

function Footer({ resetData }) {
  return (
    <div className="footer">
      <div className="footer-buttons">
        <ResetComponent resetData={resetData}></ResetComponent>
        <ShareComponent></ShareComponent>
      </div>
      <div className="footer-signature">
        <span>
          Made with ✔ by{" "}
          <a href="https://federicosavastano.vercel.app">Federico Savastano</a>
        </span>
      </div>
    </div>
  );
}

export default Footer;
