import React from 'react';
import './About.css';
import Footer from '../components/common/Footer';

function About() {
  return (
    <div>
      <section className="bg-slate-900 text-white px-3 py-[270px] lg:py-32 flex flex-col items-center transform -translate-y-[140px] lg:translate-y-[40px] ">
        <span className="text-center font-bold text-4xl">ABOUT IIST</span>
        <p className="content max-w-[990px] mt-8">
          The Indian Institute of Space Science and Technology (IIST) is a deemed university. It is established by the
          Department of Space, Government of India, in Thiruvananthapuram with the full support of Indian Space Research
          Organisation (ISRO). Started in 2007, it is the first Space university in Asia and only the third of its kind in
          the world.
          <br />
          <br />
          IIST is well on its way to becoming one of the premier institutes in the country thanks to the leadership of
          eminent figures such as former President, Bharat Ratna Dr. APJ Abdul Kalam as Founder Chancellor, Padma Bhushan
          Dr. BN Suresh as the Founding Director, Dr. S. Somanath Chairman ISRO as the President, Governing Council, IIST,
          and the Director of Vikram Sarabhai Space Centre, Dr. S. Unnikrishnan Nair, as the present Director.
        </p>
      </section>

      <section className="px-3 bg-slate-900 text-white font-light py-16 flex flex-col items-center transform -translate-y-[390px] lg:translate-y-[40px] mb-[-300px] lg:mb-40">
        <span className="text-center font-bold text-4xl">ABOUT CONSCIENTIA</span>
        <p className="content max-w-[990px] mt-8">
          Conscientia, where the realms of imagination and technology converge, we are thrilled to present to you our
          exhilarating technology fest, hosted by our esteemed institution. Conscientia is a platform where tech
          enthusiasts, engineers, intellects, and students showcase their skills and exchange ideas. From the riveting
          world of robotics where pretty machines come to life, to the thrilling field of rocketry, Conscientia offers a
          diverse range of events that will challenge and inspire you. Get ready to immerse yourself in the complexity of
          programming, witness the power of modeling, and participate in exciting online events with great prizes that
          test your knowledge and problem-solving abilities. Join us at Conscientia to open the doors of technological
          marvels. Brace yourself for an event that will ignite your creativity. Together, let's embark on a journey to
          go beyond ultra!
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default About;
