import React from "react";
import "@/styles/main.scss"
const Loading = () => {
  const text = ["L", "O", "A", "D", "I", "N", "G", "..."];

  return (
    <div className="wrap-loader">
      <div className="loader">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="box"></div>
        ))}
        <div className="wrap-text">
          <div className="text">
            {text.map((val, index) => (
              <span key={index}>{val}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="loader-text">wait please</div>
    </div>
  );
};

export default Loading;
