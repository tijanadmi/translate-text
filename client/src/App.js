import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([]);
  const [form, setForm] = useState({
    to: "",
    from: "",
    text: "",
    traslatedText: ""
  });

  useEffect(() => {
    const data = getAllLanguages()
    data.then(res => {
      setLanguages(res)
    })
  }, []);

  async function getAllLanguages() {
    const response = await fetch(`http://localhost:8080/getalllanguages`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    return await response.json();
   }

   async function handleTranslate() {
    const data = {
      sourceLang: form.from,
      targetLang: form.to,
      sourceText: form.text
    }
    const response = await fetch(`http://localhost:8080/translate`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    response.json().then(res => {
      handleChange({
        name: 'traslatedText',
        value: res.data.translations[0].translatedText
      })
    })
  }

  const handleChange = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value
    });
  };

  return (<div className="App">
  <header className="App-header">
  <div className="m-100">
     <div className="d-flex gap-3 m-4 justify-content-around">
       <select
         className="form-select w-50"
         aria-label="Default select example"
         name="from"
         value={form.from}
         onChange={({ target }) => handleChange(target)}
       >
         {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
       </select>
       <select
         className="form-select w-50"
         aria-label="Default select example"
         name="to"
         value={form.to}
         onChange={({ target }) => handleChange(target)}
       >
         {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
       </select>
     </div>
     <div className="d-flex gap-3 m-4 ">
       <label>Enter text to translate: </label>
       <div className="form-floating">
         <textarea
           className="form-control"
           id="inputText"
           name="text"
           value={form.text}
           onChange={({ target }) => handleChange(target)}
         ></textarea>
       </div>
       <div className="form-floating">
         <textarea
           className="form-control ml-200"
           id="traslatedText"
           name="traslatedText"
           value={form.traslatedText}
           onChange={({ target }) => handleChange(target)}
         ></textarea>
       </div>
     </div>
     <div>
       <button
         type="button"
         className="btn btn-primary mx-4"
         onClick={handleTranslate}
       >
         Translate
       </button>
     </div>
   </div>
  </header>
</div>
    
  );
}

export default App;
