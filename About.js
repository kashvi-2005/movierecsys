import React from 'react';
//employed ai help to disable scrolling and centering images and background

const About = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100vh',
        backgroundImage: 'url(/pexels-tima-miroshnichenko-7991579.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        margin: 0,
        overflow: 'hidden', 
      }}
    >
      <div
        style={{
          color: '#FFF',
        }}
      >
        <h1 style={{ color: '#00008B', marginTop: '55px' }}>About</h1>
        <h2 style={{ color: 'red', marginTop: '30px'}}>Kashvi Joshi</h2>
        <h3>Manipal University</h3>
        <h3>Class of 2027</h3>
        <h3>
          <a
            href="https://github.com/kashvi-2005"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFF' }}
          >
            Github link of Kashvi Joshi
          </a>
        </h3>
        <h3>
          <a
            href="https://github.com/kashvi-2005/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFF' }}
          >
            Github link for this webpage
          </a>
        </h3>
      </div>
    </div>
  );
}

export default About;
