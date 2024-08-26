const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Traumacare Medical and Healthcare is a leading provider of
          comprehensive medical services, offering patients the convenience of
          booking doctor appointments online. With a commitment to accessible
          and quality healthcare, Traumacare connects users with experienced
          doctors across various specialties, ensuring timely and efficient
          care. Whether you need a routine check-up, specialist consultation, or
          urgent care, Traumacare&apos;s user-friendly platform allows you to
          schedule appointments from the comfort of your home. The service is
          designed to cater to the diverse needs of patients, providing
          personalized medical attention and a seamless healthcare experience.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
