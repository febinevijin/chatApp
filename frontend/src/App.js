import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ImageUploader from "./pages/ImageUploader";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/chats' element={<ChatPage/> } />
        <Route path='/image' element={<ImageUploader/> } />
      </Routes>
    </div>
  );
}

export default App;
