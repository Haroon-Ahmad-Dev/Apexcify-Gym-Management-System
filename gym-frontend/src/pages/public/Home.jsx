import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../../styles/home.css";

export const Home = () => {
  return (
    <section className="home">
      {/* HERO SECTION */}
      <div className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <ReactTyped
            strings={[
              "Transform Your Body",
              "Build Strength",
              "Achieve Your Fitness Goals",
            ]}
            typeSpeed={60}
            backSpeed={40}
            loop
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Train hard. Stay fit. Live strong with ApexcifyGym.
        </motion.p>

        <motion.button
          className="hero-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Now
        </motion.button>
      </div>

      {/* IMAGE SLIDER */}
      <motion.div
        className="slider-wrapper"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          centeredSlides
          slidesPerView={3}
          spaceBetween={30}
        >
          {[
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f",
            "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
            "https://images.unsplash.com/photo-1571902258032-78a79ad3616a",
            "https://images.unsplash.com/photo-1593079831268-3381b0db4a77",
            "https://images.unsplash.com/photo-1574680096145-d05b474e2155",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
            "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5",
            "https://images.unsplash.com/photo-1590487988256-9ed24133863e",
            "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <div className="slide-card">
                <img src={img} alt="gym" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[
          {
            icon: "💪",
            title: "Expert Trainers",
            text: "Certified professionals",
          },
          {
            icon: "🏋️",
            title: "Modern Equipment",
            text: "Latest machines & tools",
          },
          {
            icon: "⏱",
            title: "Flexible Timings",
            text: "Morning & evening slots",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.08 }}
          >
            <h3>
              {f.icon} {f.title}
            </h3>
            <p>{f.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="cta"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Start Your Fitness Journey Today</h2>
        <p>
          Join ApexcifyGym and experience professional training, discipline, and
          real transformation.
        </p>
        <button className="hero-btn">Get Started</button>
      </motion.div>
    </section>
  );
};
