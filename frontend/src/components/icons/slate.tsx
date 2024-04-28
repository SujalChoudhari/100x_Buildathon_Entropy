import { SVGProps } from "react-html-props";

const Slate = (props: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="49"
      viewBox="0 0 48 49"
      fill="none"
      {...props}
    >
      <path
        d="M25.6961 8.75651C24.6839 8.11144 23.3161 8.11144 22.3039 8.75651L1.19752 22.2075C-0.399181 23.2251 -0.399174 25.3203 1.19753 26.3379L22.3039 39.7889C23.3161 40.434 24.6839 40.434 25.6961 39.7889L46.8025 26.3379C48.3992 25.3203 48.3992 23.2251 46.8025 22.2075L25.6961 8.75651Z"
        fill="url(#paint0_linear_936_4148)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_936_4148"
          x1="24"
          y1="19.7104"
          x2="24"
          y2="40.2727"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6D6E7" />
          <stop offset="1" stopColor="#F1F5F9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Slate;
