import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

export const CounterUp = ({ count, duration = 2 }) => {
    const { ref, inView } = useInView({
      // Remove triggerOnce to allow multiple triggers
      threshold: 0.5,
      // Add rootMargin to trigger earlier/later
      rootMargin: '-50px 0px', // Adjust this value as needed
    });
  
    return (
      <span ref={ref}>
        <CountUp
          start={0}
          end={inView ? count : 0}
          duration={duration}
          separator=","
          redraw={true} // Force redraw when values change
        />
      </span>
    );
  };