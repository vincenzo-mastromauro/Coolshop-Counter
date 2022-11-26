import { useState } from "react";
import Row from "./components/row/row";
import "./App.css";

function App() {
  return (
    <section className='text-white text-center bg-slate-900 h-screen flex justify-center	 items-center	 flex-col	 '>
      <h1 className='font-bold text-6xl p-10 l'>React Counter 🔢</h1>
      <Row />
    </section>
  );
}

export default App;
