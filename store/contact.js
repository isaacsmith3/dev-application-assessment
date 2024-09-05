import { blankPlan } from "../store/blankPlan"
// import { client } from "@/utils/trpc-provider";
// import { model, Schema } from "mongoose";
import { create } from "zustand";

// import { Plan } from "@repo/server/src/models/plan";

// type PlanStore = {
//   currentPlan: Plan;
//   setCurrentPlan: (plan: Plan) => void;
//   plans: Plan[];
//   getPlans: () => Plan[];
//   setPlans: (plans: Plan[]) => void;
//   createPlan: (plan: Plan) => void;
//   updatePlan: (plan: Plan) => void;
//   deletePlan: (plan: Plan) => Promise<void>;
// };

import plansData from "./plansData.json";

export const usePlanStore = create()((set, get) => ({
  currentPlan: blankPlan,
  setCurrentPlan(plan) {
    set({ currentPlan: plan });
  },
  plans: plansData,
  getPlans() {
    return this.plans;
  },
  setPlans(plans) {
    set({ plans });
  },
  async createPlan(plan) {
    // const response = await client.plan.create.mutate({
    //   name: plan.name,
    //   pill: plan.pill,
    //   price: plan.price,
    //   days: plan.days,
    //   id: plan.id,
    // });
    // const planData = response;
    // const newPlan = planData.plan;

    const newPlan = plan;

    set({ currentPlan: newPlan });
    let currentPlans = get().plans;
    currentPlans.push(newPlan);
    set({ plans: currentPlans });
  },
  async updatePlan(plan) {
    // const returnedPlan = (await client.plan.update.mutate({
    //   name: plan.name,
    //   pill: plan.pill,
    //   price: plan.price,
    //   days: plan.days,
    //   id: plan.id,
    // })) ;

    // console.log(returnedPlan.id, returnedPlan._id);

    const returnedPlan = plan;

    const updatedPlan = {
      ...returnedPlan,
      id: returnedPlan.id ?? returnedPlan._id,
    };

    set({ currentPlan: updatedPlan });
    const currentPlans = get().plans;
    const updatedPlans = currentPlans.map((p) =>
      p.id === updatedPlan.id ? updatedPlan : p,
    );
    return set({ plans: updatedPlans });
  },
  async deletePlan(plan) {
    // await client.plan.delete.mutate({ id });
    set((state) => {
      const updatedPlans = state.plans.filter(
        (thePlan) => thePlan.id !== plan.id,
      );
      return { plans: updatedPlans };
    });
  },
}));
export { blankPlan };
