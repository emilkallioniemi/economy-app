import { Suspense } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Authenticate } from "./authenticate";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <h1 className="text-xl font-bold">Loading...</h1>
            </div>
          </div>
        </div>
      }
    >
      <Authenticate />
    </Suspense>
  );
}
