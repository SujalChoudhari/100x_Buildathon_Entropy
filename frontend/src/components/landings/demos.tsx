import CheckCircle from "@/components/icons/check-circle";
import ThemeBasedImage from "@/components/theme-based-image";
import { Button } from "@/components/ui/button";

const Demos = () => {
  return (
    <div className="container px-4 mt-14">
      <div className="flex flex-col md:flex-row items-center gap-20">
        <div className="text-start max-w-[496px] flex flex-col gap-[30px]">
          <div className="font-bold text-5xl">Track and analyze sales</div>
          <p className="font-medium text-secondary-foreground">
          Cleo also offers an AI Voice Call feature, enabling communication between the assistant and the customer.
          </p>

          <div>
            <p className="flex items-center font-medium">
              <CheckCircle className="mr-3" />
              <span>Proficiently pitches products and addresses customer queries with precision.</span>
            </p>
            <p className="flex items-center font-medium my-3">
              <CheckCircle className="mr-3" />
              <span>Call summary, transcript and audio-recording which is further stored and used by the assistant</span>
            </p>
            <p className="flex items-center font-medium">
              <CheckCircle className="mr-3" />
              <span>Admin can send emails to multiple recipients with just a few clicks, streamlining communication and saving valuable time</span>
            </p>
          </div>

          
        </div>

        <div className="flex justify-center md:justify-end">
          <ThemeBasedImage
            width={733}
            height={778}
            lightSrc="/voicecall.png"
            darkSrc="/voicecall.png"
            alt="shadcnkit"
            className="rounded-3xl"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-20 my-[100px] md:my-[160px]">
        <div>
          <ThemeBasedImage
            width={1328}
            height={870}
            lightSrc="/chat.png"
            darkSrc="/proposal.png"
            alt="shadcnkit"
            className="rounded-3xl"
          />
        </div>

        <div className="text-start max-w-[420px] flex flex-col gap-[30px]">
          <h4 className="font-bold text-5xl">Sales Proposal Generation</h4>
          <p className="font-medium text-secondary-foreground">
          Cleo generates effective sales proposals based on previous chats, analytics and company documents.
          </p>

          <div>
            <p className="flex items-center font-medium">
              <CheckCircle className="mr-3" />
              <span>Can be viewed in HTML form</span>
            </p>
            <p className="flex items-center font-medium my-3">
              <CheckCircle className="mr-3" />
              <span>PDF form to be downloaded</span>
            </p>
            <p className="flex items-center font-medium">
              <CheckCircle className="mr-3" />
              <span>Information Gap Analysis</span>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Demos;
