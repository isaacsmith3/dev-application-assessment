import { blankPlan } from "../store/blankPlan"
import { create } from "zustand";

const API_URL = 'http://localhost:3001';

import plansData from "../server/data.json";

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

    const response = await fetch(`${API_URL}/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });

    const newPlan = await response.json()

    set({ currentPlan: newPlan });
    let currentPlans = get().plans;
    currentPlans.push(newPlan);
    set({ plans: currentPlans });
  },
  async updatePlan(plan) {
    const response = await fetch(`${API_URL}/plans/${plan.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });
    const returnedPlan = await response.json();

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
    await fetch(`${API_URL}/plans/${plan.id}`, {
      method: 'DELETE',
    });
    set((state) => {
      const updatedPlans = state.plans.filter(
        (thePlan) => thePlan.id !== plan.id,
      );
      return { plans: updatedPlans };
    });
  },
}));
export { blankPlan };
