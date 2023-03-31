import React, { useState, useRef } from 'react';
import axios from "axios";
import TextBlock from './components/TextBlock';
import FileBlock from './components/FileBlock';
import WikiBlock from './components/WikiBlock';


function App() {

  /* The state for WikiBlock. 
   * resultWiki is a string containing NER output.
   * setResultWiki acts as a function that changes resultWiki, with rerendering.
   */
  let [resultWiki, setResultWiki] = useState("show results here")


  /* handleSubmitWiki is the event handler for the WikiBlock. 
   * It receives a wiki "topic" and calls the corresponding web address,
   * which triggers django backend to run NER algorithm and send back json info,
   * which we then use to update our resultWiki state.
   */
  const handleSubmitWiki = async (topic) => {
    const response = await axios.get(`http://127.0.0.1:8000/wiki/get_ner_on/?topic="${topic}"`, {
      withCredentials: false,
    });
    const output = response.data.entity;
    const output_format = output.replace(/\n/g, "<br />");
    setResultWiki(output_format);
  }


  /* We are currently focusing on 3 primary blocks: TextBlock, FileBlock, WikiBlock 
   * TextBlock receives NER output from user input text.
   * TextBlock receives NER output from user input file.
   * WikiBlock receives NER output from user specified wikipedia topic.
   */
  return (
    <div>
      <h1>Named Entity Recognition Tool</h1>
      <br/>
      <TextBlock />
      <br/>
      <br/>
      <FileBlock />
      <br/>
      <br/>
      <WikiBlock onSubmitWiki={handleSubmitWiki}/>
      <h3>Wiki Result:</h3>
      <p dangerouslySetInnerHTML={{__html: resultWiki}} />
    </div>
  );
}


export default App;