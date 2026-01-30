import { Spinner } from "@/components/ui/spinner";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const Loading = () => {
  return (
    <div
      className="flex w-full justify-center items-center"
      style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)` }}
    >
      <Spinner className="size-8 md:size-12" />
    </div>
  );
};

export default Loading;
