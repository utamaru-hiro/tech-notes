import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";

const SampleSparkIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 64 64"
    ref={ref}
    {...props}
  >
    <defs>
      <linearGradient
        id="prefix__a"
        x1={8}
        x2={56}
        y1={8}
        y2={56}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7a5c00" />
        <stop offset={1} stopColor="#ba8d21" />
      </linearGradient>
    </defs>
    <rect width={48} height={48} x={8} y={8} fill="#fff7e6" rx={14} />
    <path
      fill="url(#prefix__a)"
      d="m32 16 4.4 11.6L48 32l-11.6 4.4L32 48l-4.4-11.6L16 32l11.6-4.4z"
    />
    <circle cx={20} cy={20} r={2} fill="#d4a72c" />
    <circle cx={44} cy={20} r={1.8} fill="#d4a72c" />
    <circle cx={44} cy={44} r={2} fill="#d4a72c" />
    <circle cx={20} cy={44} r={1.8} fill="#d4a72c" />
  </svg>
);

const ForwardRef = forwardRef(SampleSparkIcon);
const Memo = memo(ForwardRef);

export default Memo;
