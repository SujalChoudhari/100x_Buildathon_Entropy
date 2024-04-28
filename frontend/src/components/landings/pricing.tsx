import CheckCircle from "@/components/icons/check-circle";
import Slate from "@/components/icons/slate";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Pricing = () => {
  return (
    <div className="container px-4 mb-[100px] md:mb-[160px]">
      <div className="max-w-[526px] mx-auto mb-12 text-center">
        <h4 className="font-bold mb-7">Our Flexible Price Plan</h4>
        <p className="font-medium text-secondary-foreground">
          Our Free Plan lets you get going right away. Switch to a Pro plan to
          get more features.
        </p>

        <div className="flex items-center justify-center space-x-2 mt-12">
          <Label htmlFor="airplane-mode" className="text-base font-medium">
            MONTHLY
          </Label>
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode" className="text-base font-medium">
            YEARLY (Save 15%)
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="p-10 rounded-2xl border border-border hover:border-primary group">
          <p className="font-semibold text-secondary-foreground">BASIC</p>
          <h4 className="font-bold mt-6">Free</h4>
          <Slate className="my-12" />

          <div className="flex flex-col gap-4 mb-12">
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 prototypes</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 boards</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Single user</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Normal security</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Permissions & workflows</span>
            </p>
          </div>

          <Button className="bg-icon w-full group-hover:bg-primary">
            Choose Plan
          </Button>
        </div>

        <div className="p-10 rounded-2xl border border-border hover:border-primary group">
          <p className="font-semibold text-secondary-foreground">STANDARD</p>
          <h4 className="font-bold mt-6">
            $14
            <span className="text-base font-normal text-secondary-foreground">
              /month
            </span>
          </h4>
          <Slate className="my-12" />

          <div className="flex flex-col gap-4 mb-12">
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 prototypes</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 boards</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Single user</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Normal security</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Permissions & workflows</span>
            </p>
          </div>

          <Button className="bg-icon w-full group-hover:bg-primary">
            Choose Plan
          </Button>
        </div>

        <div className="p-10 rounded-2xl border border-border hover:border-primary group">
          <p className="font-semibold">ENTERPRISE</p>
          <h4 className="font-bold mt-6">
            $50
            <span className="text-base font-normal text-secondary-foreground">
              /month
            </span>
          </h4>
          <Slate className="my-12" />

          <div className="flex flex-col gap-4 mb-12">
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 prototypes</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>3 boards</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Single user</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Normal security</span>
            </p>
            <p className="flex items-center">
              <CheckCircle className="mr-3 w-4 h-4" />
              <span>Permissions & workflows</span>
            </p>
          </div>

          <Button className="bg-icon w-full group-hover:bg-primary">
            Choose Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
