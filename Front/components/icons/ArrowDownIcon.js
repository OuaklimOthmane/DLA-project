const ArrowDownIcon = ({ width = "24", height = "24", fill = "#fff" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6.5 6.75L12 1"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
