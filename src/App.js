// + add the useEffect import
import {useEffect, useState} from 'react';
import {Button, Card, CardActions, CardContent} from "@material-ui/core";


function MyText(prop) {
  return <p style={{justifyContent: 'center', fontSize: '40px'}}>{prop.text}</p>
}

//
function App() {
  const [text, setText] = useState('');

  async function nextQuestion() {
    let pk = text.id
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pose_question: false, internal_rating: text.internal_rating - 200})
    };
    let url = "http://35.223.44.38/sentence/" + pk + "/"
    fetch(url, requestOptions)
      .then(response => response.json());

    const response = await fetch("http://35.223.44.38/sentence/random-sentence/");
    const data = await response.json();
    console.log(data)
    // store the data into our books variable
    setText(data);
  }

  async function confirm() {
    let pk = text.id
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pose_question: true})
    };
    let url = "http://35.223.44.38/sentence/" + pk + "/set-pose/"
    fetch(url, requestOptions)
      .then(response => response.json());

    const response = await fetch("http://35.223.44.38/sentence/random-sentence/");
    const data = await response.json();
    console.log(data)
    // store the data into our books variable
    setText(data);
  }

  // + adding the use
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("http://35.223.44.38/sentence/random-sentence/");
      const data = await response.json();
      console.log(data)
      // store the data into our books variable
      setText(data);
    }
  }, []); // <- you may need to put the setBooks function in this array

  return (
    <Card variant="outlined" sx={{maxWidth: 275}}>
      <CardContent>
        <div>
          <h1>Card # {text.id} - rating {text.internal_rating}</h1>

          <MyText text={text.text}/>
        </div>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>

        <Button variant="contained" onClick={nextQuestion} size="large"><h1>Nope</h1></Button>
        <Button variant="contained" onClick={confirm} size="large"><h1>Post</h1></Button>

      </CardActions>
    </Card>
  )
}

export default App;