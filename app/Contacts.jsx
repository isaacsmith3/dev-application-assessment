"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { useAuthStore } from "@/store/authStore";
// import { set } from "date-fns";
// import { toast } from "react-hot-toast";
// import { useDebouncedCallback } from "use-debounce";

import { blankPlan } from "../store/blankPlan";
import { usePlanStore } from "../store/contact";

import PlanEditor from "../components/PlanEditor";
// import { Plan } from "@repo/server/src/models/plan";

export default function Contacts() {
  const { currentPlan, plans, setCurrentPlan, createPlan } = usePlanStore();
  const [planSearch, setPlanSearch] = useState(plans);
  const [searchBar, setSearchBar] = useState("");
//   const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let newPlans = plans;
    setPlanSearch(newPlans);
    // console.log(newPlans);
  }, [currentPlan, plans]);

  function handlePlanChange(id) {
    // if (isDirty) {
    //   toast((t) => (
    //     <div className="flex flex-col gap-4">
    //       <h1>Are you sure you want to leave without saving your edits?</h1>
    //       <div className="flex flex-row items-center justify-center gap-2">
    //         <Button
    //           onClick={() => {
    //             toast.dismiss(t.id);
    //             for (let i = 0; i < plans.length; i++) {
    //               if (plans[i].id === id) {
    //                 const updatedCurrentPlan = plans[i];
    //                 setCurrentPlan(updatedCurrentPlan);
    //               }
    //             }
    //             setIsDirty(false);
    //           }}
    //         >
    //           Yes
    //         </Button>
    //         <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
    //       </div>
    //     </div>
    //   ));
    // } else {
      for (let i = 0; i < plans.length; i++) {
        if (plans[i].id === id) {
          const updatedCurrentPlan = plans[i];
          setCurrentPlan(updatedCurrentPlan);
        //   setIsDirty(false);
        }
      }
    // }
  }

  function handleCreatePlan() {
    // if (isDirty) {
    //   toast((t) => (
    //     <div className="flex flex-col gap-4">
    //       <h1>Are you sure you want to leave without saving your edits?</h1>
    //       <div className="flex flex-row items-center justify-center gap-2">
    //         <Button
    //           onClick={() => {
    //             toast.dismiss(t.id);
    //             const newPlan = blankPlan;
    //             setCurrentPlan(newPlan);
    //             setIsDirty(false);
    //           }}
    //         >
    //           Yes
    //         </Button>
    //         <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
    //       </div>
    //     </div>
    //   ));
    // } else {
      const newPlan = blankPlan;
      setCurrentPlan(newPlan);
    //   setIsDirty(false);
    // }
  }

//   const debounced = useDebouncedCallback((search) => {
//     if (search != "") {
//       let searchedPlans = [];
//       for (let i = 0; i < plans.length; i++) {
//         if (plans[i].name.toLowerCase().includes(search.toLowerCase())) {
//           searchedPlans.push(plans[i]);
//         }
//       }
//       setPlanSearch(searchedPlans);
//     } else {
//       setPlanSearch(plans);
//     }
//   }, 500);

//   useEffect(() => {
//     debounced(searchBar);
//   }, [searchBar]);

//   useEffect(() => {
//     if (!profile) {
//       router.push("/");
//     }
//   }, []);


    return (
      <>
        <div className="mx-auto mt-5 max-w-[1400px] pb-10">
          <div className="max grid grid-cols-[30%_70%] ">
            <section className="flex flex-col gap-8 p-10">
              <div className="flex items-center justify-between">
                <h1 className="text-h1 text-3xl font-semibold">Plans</h1>
                <button
                  onClick={handleCreatePlan}
                  className="text-h1 text-3xl text-white"
                >
                  +
                </button>
              </div>
              {/* <label className="flex items-center gap-2 rounded border border-border p-1 pl-4">
                <input
                  className="h-12 w-[100%]"
                  type="text"
                  required
                  placeholder="Search"
                  onChange={(event) => {
                    setSearchBar(event.target.value);
                  }}
                ></input>
              </label> */}
              <div className="h-[60vh] w-60 p-2">
                {planSearch.map((plan) => {
                  return (
                    <div>
                      <Button
                        key={plan.id}
                        className={`border-1 mb-6 h-12 w-[100%] flex-shrink-0 rounded text-center text-black  hover:bg-[#b5bac0] ${currentPlan.id === plan.id ? "bg-[#cbd1d8]" : "bg-input"} bg-white`}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        <div className="flex flex-row justify-start gap-4">
                          <h3 className="">{plan.name}</h3>
                        </div>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </section>
            {currentPlan && (
              <div className="h-[80vh] p-2">
                <PlanEditor />
              </div>
            )}
          </div>
        </div>
      </>
    );
}
