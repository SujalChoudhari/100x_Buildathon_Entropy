"use client";
import { LuAirVent, LuBrainCircuit, LuBriefcase } from "react-icons/lu";
import microsoft from "../assests/microsoft.png";
import apple from "../assests/apple.png";
import google from "../assests/google.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

const Stars = ({ x, y }: { x: number; y: number }) => {
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${x} ${y}`}>
      {Array.from(Array(10)).map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * x}
          cy={Math.random() * y}
          r="12"
          fill="rgba(255,255,255, 1)"
        />
      ))}
    </svg>
  );
};

const Bg = () => {
  return (
    <div
      style={{ perspective: "1200px" }}
      className="w-full h-full absolute overflow-hidden"
    >
      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[-80%] top-[300px] w-full bg-green-400",
          "bg-gradient-to-bl  from-black via-blue-950 to-black opacity-50",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[30px] w-[200%] left-[-100%] top-[300px] w-full bg-green-400",
          "bg-gradient-to-bl from-black via-blue-950 to-black opacity-25",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[100px] w-[200%] left-[-60%] top-[300px] w-full bg-green-400",
          "bg-gradient-to-bl from-black via-blue-950 to-black",
        ].join(" ")}
      >
        <div className="flex w-full h-full justify-end">
          <div className="w-[30%] h-[80%] rounded-full bg-gradient-to-l from-blue-100 to-transparent saturate-200"></div>
        </div>
      </div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[-30%] top-[300px] w-full bg-green-400",
          "bg-gradient-to-bl from-black via-blue-950 to-black",
        ].join(" ")}
      ></div>

      <div
        style={{ transform: "rotateY(-45deg) rotateZ(-26deg)" }}
        className={[
          "absolute h-[50px] w-[200%] left-[10%] top-[300px] w-full bg-green-400",
          "bg-gradient-to-bl from-black via-blue-950 to-black",
        ].join(" ")}
      ></div>

      <div className="absolute w-full h-full backdrop-blur-[24px]"></div>
    </div>
  );
};

const Register = () => {
  const router = useRouter();

  const mailRef = useRef(null);
  const passRef = useRef(null);
  const onSignupClick = async () => {
    // @ts-ignore
    const email = mailRef.current.value || '';
    // @ts-ignore
    const password = passRef.current.value || '';

    const t1 = toast.loading("Attempting to Sign Up");
    try {
      const response = await axios.post('https://one00x-buildathon-entropy.onrender.com/register', {
        username: email,  // User's desired username
        email: email,        // User's email address
        password: password,  // User's plain text password
      });

      console.log('Signup successful.');
      console.log('Response:', response.data);

      router.push('/login')
      toast.success("Sign Up Successful. Login to Continue");
      return response.data; // Return the registration details

    } catch (error: any) {
      if (error.response) {
        console.error('Error:', error.response.status, error.response.data);
        toast.error("Credentials not valid. Try Again");
      } else {
        console.error('Request error:', error.message);
        toast.error("Server Refused to connect. Try Again");
      }
    }

    toast.dismiss(t1);

  }
  return (

    <div className="w-screen h-screen relative overflow-hidden">
      <Bg />
      <div className="relative z-1 w-full h-full flex items-center justify-center">
        <div
          style={{
            background: `linear-gradient(transparent, transparent) padding-box,
              linear-gradient(to right, transparent 0 50%, #3b82f6) border-box`,
            borderRadius: "16px",
            border: "1px solid transparent",
          }}
          className="overflow-hidden"
        >
          <div className="bg-black/60 p-8 flex flex-col gap-8">
            <div className="flex justify-center">
              <div className="size-[52px] p-[1px] rounded-[12px] bg-gradient-to-bl from-white to-blue-600">
                <div
                  className={[
                    "bg-gradient-to-br from-blue-900 via-20% via-blue-600 via-40% via-blue-900 to-blue-900 to-90%",
                    "relative w-full h-full rounded-[11px] flex justify-center items-center",
                    "shadow-[0_0_44px_rgba(255,255,255,0.4)]",
                  ].join(" ")}
                >
                  <div className="absolute w-full h-full overflow-hidden rounded-[11px] opacity-70">
                    <Stars x={1000} y={1000} />
                  </div>
                  <LuBrainCircuit className="text-3xl text-white" />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              <div
                style={{ backgroundClip: "text" }}
                className="text-center bg-gradient-to-r from-white to-blue-600 text-transparent text-3xl"
              >
                Create your account
              </div>
              <div className="text-center text-[11px] text-blue-100/50 font-light">
                Streamline your sales process today!
              </div>
            </div>
            {/*  */}

            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gray-400/10 border border-gray-200/10 rounded-md p-[6px] flex justify-center items-center">
                <Image width={16} alt="google" src={google} />
              </button>
              <button className="bg-gray-400/10 border border-gray-200/10 rounded-md p-[6px] flex justify-center items-center">
                <Image width={16} alt="apple" src={apple} />
              </button>

              <button className="bg-gray-400/10 border border-gray-200/10 rounded-md p-[6px] flex justify-center items-center">
                <Image width={16} alt="microsoft" src={microsoft} />
              </button>
            </div>
            {/*  */}

            <div className="flex gap-2 w-full items-center">
              <div className="flex-1 h-[1px] bg-gray-200/20"></div>
              <span className="text-sm text-white/20 text-xs">or</span>
              <div className="flex-1 h-[1px] bg-gray-200/20"></div>
            </div>

            {/*  */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white/90 text-xs">Email</label>
                <div className="bg-gradient-to-r from-blue-600 to-blue-50 rounded-[6px] p-[1px] shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  <input
                    type="email"
                    ref={mailRef}
                    className="w-full h-[32px] bg-gray-900/80 block rounded-[5px] outline-none px-3 text-white/90 text-sm font-light"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/90 text-xs">Password</label>
                <div className="bg-gradient-to-r from-blue-600 to-blue-50 rounded-[6px] p-[1px] shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  <input
                    ref={passRef}
                    type="password"
                    className="w-full h-[32px] bg-gray-900/80 block rounded-[5px] outline-none px-3 text-white/90 text-sm font-light"
                  />
                </div>
              </div>


              <button onClick={() => { onSignupClick() }} className="relative text-white bg-gradient-to-b from-blue-600 to-blue-100 rounded-[6px] w-full text-sm h-[32px] p-[1px] overflow-hidden">
                <div className="absolute w-full">
                  <Stars x={8000} y={800} />
                </div>
                <div
                  className={[
                    "w-full h-full flex items-center justify-center text-sm text-white/90 rounded-[5px]",
                    "bg-gradient-to-b from-black/40 via-blue-900 to-blue-600",
                  ].join(" ")}
                >
                  Continue
                </div>
              </button>
              <div className="text-[10px] text-blue-100/50 font-light">
                By signing up, you agree to our{" "}
                <a className="underline">Terms and conditions</a> &{" "}
                <a className="underline" href="">
                  Privacy Policy
                </a>
              </div>
            </div>
            {/*  */}
            <div className="text-[12px] text-blue-100/50 font-light text-center">
              Already have an account?{" "}
              <a className="text-white/80" href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Register;