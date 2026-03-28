import { motion } from "framer-motion";
import "../../styles/about.css";

export const About = () => {
  return (
    <section className="about">
      {/* HERO */}
      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About ApexcifyGym</h1>
        <p>Where discipline meets transformation.</p>
      </motion.div>

      {/* STORY */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Our Philosophy</h2>
        <p>
          ApexcifyGym is not just a gym — it’s a commitment to a healthier,
          stronger, and more confident lifestyle. We focus on discipline,
          consistency, and professional guidance to deliver real results.
        </p>
      </motion.div>

      {/* WHY US */}
      <motion.div
        className="about-cards"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
            title: "Certified Trainers",
            text: "Highly experienced professionals who guide you safely and effectively.",
            icon: "💪",
          },
          {
            title: "Modern Equipment",
            text: "Top-quality machines designed for all fitness levels.",
            icon: "🏋️",
          },
          {
            title: "Personalized Plans",
            text: "Workout & diet plans tailored to your body and goals.",
            icon: "📋",
          },
          {
            title: "Supportive Environment",
            text: "Motivating, hygienic, and positive gym culture.",
            icon: "🔥",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="about-card"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.07 }}
          >
            <h3>
              {item.icon} {item.title}
            </h3>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* STATS */}
      <motion.div
        className="stats"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div>
          <h3>5K+</h3>
          <p>Active Members</p>
        </div>
        <div>
          <h3>15+</h3>
          <p>Expert Trainers</p>
        </div>
        <div>
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>
      </motion.div>

      {/* TESTIMONIALS */}
      <motion.div
        className="reviews"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>What Our Members Say</h2>
        <div className="review-cards">
          <div>“Best gym experience I’ve ever had.” ⭐⭐⭐⭐⭐</div>
          <div>“Trainers genuinely care about results.” ⭐⭐⭐⭐</div>
          <div>“Clean, motivating and professional.” ⭐⭐⭐⭐⭐</div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="about-cta"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Ready to Transform Your Life?</h2>
        <p>
          Join ApexcifyGym today and become the strongest version of yourself.
        </p>
        <button className="join-btn">Join ApexcifyGym</button>

        <p className="intern-note">
          Built as a full-stack internship project at{" "}
          <strong>Apexcify Technologys</strong>.
        </p>
      </motion.div>
    </section>
  );
};
