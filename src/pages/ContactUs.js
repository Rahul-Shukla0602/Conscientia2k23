import React from 'react';
import './contact.css';
import { teams } from '../data/teams';
// import 'boxicons'

function ContactUs() {
  return (
    <div>
      <section className="z-40 min-h-screen relative bg-slate-900 text-base text-white font-light pt-32">
        <span className="block w-full text-center font-bold text-4xl">OUR TEAMS</span>
        <section className="coordinator">
          {teams.map((item, i) => {
            if (item.id === 1) {
              return (
                <div className="people" key={item.id}>
                  <img src={item.photo} alt={item.name} className="profile" />
                  <span className="name">{item.name}</span>
                  <div className="info">
                    <span className="designation">{item.designation}</span>
                    <span className="links">
                      {/* <a href=""><box-icon name='linkedin-square' type='logo' color='rgba(252,250,250,1)' /></a>
                  <a href=''><box-icon type='solid' name='envelope' color='rgba(252,250,250,1)'/></a> */}
                    </span>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </section>
        <section className="others">
          {teams.map((item, i) => {
            if (item.id !== 1) {
              return (
                <div className="people" key={item.id}>
                  <img src={item.photo} alt={item.name} className="profile" />
                  <span className="name">{item.name}</span>
                  <div className="info">
                    <span className="designation">{item.designation}</span>
                    <span className="links">
                      <a href={`https://www.linkedin.com/in/${item.linkedin}/`}>
                        <box-icon name="linkedin-square" type="logo" color="rgba(252,250,250,1)" />
                      </a>
                      <a href={`malito:${item.email}`}>
                        <box-icon type="solid" name="envelope" color="rgba(252,250,250,1)" />
                      </a>
                    </span>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </section>
      </section>
    </div>
  );
}

export default ContactUs;
