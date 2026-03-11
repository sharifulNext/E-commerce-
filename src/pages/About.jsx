import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Title */}
      <div className="text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Section */}
      <div className="my-12 grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div className="w-full">
          <img
            className="w-full rounded-xl shadow-lg object-cover"
            src={assets.about_img}
            alt="About Cloth Store"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 text-gray-600 text-[16px] md:text-[17px] leading-relaxed">
          <p>
            Cloth Store was born out of a passion for innovation and a desire to
            redefine the online shopping experience. We believe that fashion
            should be accessible, stylish, and convenient. From everyday
            essentials to standout pieces, our mission is to bring you quality
            clothing that fits your lifestyle.
          </p>

          <p>
            Our dedicated team carefully curates each collection to reflect the
            latest trends while maintaining comfort and affordability. Whether
            you’re dressing for a casual outing, a workday, or a special event,
            Cloth Store ensures you always look and feel your best.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p>
              Our mission is to provide high-quality, affordable clothing that
              empowers individuals to express their unique style confidently. We
              strive to create a seamless shopping experience by combining
              innovation, customer service, and sustainable practices.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">

        {/* Card 1 */}
        <div className="border rounded-xl p-8 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-3">Quality Assurance</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We are committed to maintaining the highest standards of quality in
            every product we offer. From sourcing premium materials to rigorous
            quality checks, each item meets our excellence criteria before it
            reaches you.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-8 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-3">Convenience</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Shopping with us is designed to be easy and hassle-free. With a
            user-friendly interface, fast delivery, and secure payment options,
            we aim to make your experience smooth and enjoyable.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-xl p-8 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg mb-3">
            Exceptional Customer Service
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our dedicated support team is always here to assist you. Whether you
            have a question or need help with your order, we provide friendly,
            fast, and reliable service every step of the way.
          </p>
        </div>

      </div>

      {/* Newsletter */}
      <NewsletterBox />

    </div>
  );
};

export default About;