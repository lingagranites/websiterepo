import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [username, setUsername] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseText, setResponseText] = useState('');
  const [responseColor, setResponseColor] = useState('');

  const [input, setInput] = useState({
        name: '',
        number: '',
        email: '',
        message: ''
      });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !number || !email || !message) {
      setResponseText('Please fill in all input fields.');
      setResponseColor('red');
      setTimeout(() => {
        setResponseText('');
      }, 3000); 
      return; 
    }

    const data = {
      name: username,
      number: number,
      email: email,
      message: message
    };

    axios
      .post('https://www.lingagranites.com/insert', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res);
        setResponseText('Message sent successfully!');
        setResponseColor('black'); 
        resetForm();
        setTimeout(() => {
          setResponseText('');
        }, 5000); 
      })
      .catch((err) => {
        console.log(err);
        setResponseText('Error occurs in sending Message...!!!');
        setResponseColor('red'); 
      });
  };

  const resetForm = () => {
    setUsername('');
    setNumber('');
    setEmail('');
    setMessage('');
  };

  const [responseMessage, setResponseMessage] = useState('');

  return (
    <div className="contact_main_div">
      <div className="contact_content_div">
        <div>
          <h1 className="head_text_contact">Contact</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form_input_div">
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoComplete="off"
              name="name"
              placeholder="Name"
              className="insideinput"
              value={username}
            />
          </div>
          <div className="form_input_div">
            <input
              type="number"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              autoComplete="off"
              name="number"
              placeholder="Number"
              className="insideinput"
              value={number}
            />
          </div>
          <div className="form_input_div">
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
              name="email"
              placeholder="Email"
              className="insideinput"
              value={email}
            />
          </div>
          <div className="form_input_div">
            <input
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              autoComplete="off"
              name="message"
              placeholder="Message"
              className="insideinput"
              value={message}
            />
          </div>
          <div className="form_input_div">
          <input
              type="submit"
              value={responseText ? responseText : 'Submit'}
              className="insideinput"
              style={{
                backgroundColor: 'lightskyblue',
                cursor: 'pointer',
                color: responseColor ? responseColor : 'black'
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

