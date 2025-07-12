import { useState , useCallback ,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [characterAllowed,setCharacterAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp";

    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*+=-_~"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      
      pass += str.charAt (char);
    }
    setPassword(pass);
  },[length,numberAllowed,characterAllowed,setPassword])


  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  })

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])

 return (
  <div className="h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md space-y-6 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
       Password Generator
      </h2>

      {/* Password Field & Copy */}
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-inner">
        <input
          type="text"
          value={password}
          placeholder="Your Password"
          readOnly
          ref={passwordRef}
          className="flex-1 px-4 py-2 text-lg text-gray-700 bg-gray-100 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md rounded-r-md"
        >
          Copy
        </button>
      </div>

      {/* Range Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Password Length: <span className="font-bold text-indigo-600">{length}</span>
        </label>
        <input
          type="range"
          min="6"
          max="20"
          value={length}
          className="w-full accent-indigo-600 transition duration-200 ease-in-out"
          onChange={(e) => setLength(e.target.value)}
        />
        <label className="text-sm text-gray-700 mt-1 block">Length: {length}</label>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center space-x-2 text-gray-800 hover:text-indigo-700 transition">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="accent-indigo-500 w-5 h-5 rounded transition transform hover:scale-110"
          />
          <span>Include Numbers</span>
        </label>

        <label className="flex items-center space-x-2 text-gray-800 hover:text-pink-600 transition">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
            className="accent-pink-500 w-5 h-5 rounded transition transform hover:scale-110"
          />
          <span>Include Symbols</span>
        </label>
      </div>
    </div>
  </div>
);


}

export default App
