import {createRoot} from "react-dom/client";

import About from "@components/about";


document.addEventListener('DOMContentLoaded', () => {

  const root = createRoot(document.getElementById("root"));
  root.render(<About />);

})
