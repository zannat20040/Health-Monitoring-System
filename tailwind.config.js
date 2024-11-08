const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: "#614385",
        primary: "#50B8E7",
        primary1: "#84CDEE",
        primary2: "#B9E2F5",
        primary3: "#DCF0FA",
        primary4: "#EDF7FC",
      },
    },
  },
  // plugins: [require("daisyui")],
});
