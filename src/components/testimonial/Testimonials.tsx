import { motion } from "motion/react";
import { TestimonialsColumn } from "../ui/testimonials-columns-1";
import { testimonialsForColumn } from "../../data/testimonials";

const firstColumn = testimonialsForColumn.slice(0, 3);
const secondColumn = testimonialsForColumn.slice(3, 6);
const thirdColumn = testimonialsForColumn.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="w-full bg-secondary my-25 pt-5 relative">
      <div className="w-full z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 bg-primary/10 text-primary py-2 px-4 rounded-lg font-medium">
              Témoignages
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center text-white">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-center mt-5 text-white/80">
            Découvrez les retours de nos clients satisfaits.
          </p>
        </motion.div>

        <div className="w-full flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
