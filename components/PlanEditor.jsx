"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// import { Plan } from "@repo/server/src/models/plan";
import { usePlanStore } from "../store/contact";
import { blankPlan } from "../store/blankPlan";

// type handleChangeType = (
//   name: string,
// ) => (text: ChangeEvent<HTMLInputElement>) => void;
// type handleChangeHelper = (text: ChangeEvent<HTMLInputElement>) => void;

// interface PlanEditorProps {
//   isDirty: boolean;
//   setIsDirty: (isDirty: boolean) => void;
// }

const PlanEditor = () => {
  const { currentPlan, setCurrentPlan, updatePlan, deletePlan, createPlan } =
    usePlanStore();

  const handleChange = (name) => {
    return (text) => {
      let value = text.target.value;
      setCurrentPlan({
        ...currentPlan,
        [name]: value,
      });
    };
  };

  const handleSubmit = () => {
    const updatedCurrentPlan = {
      ...currentPlan,
      price: parseFloat(currentPlan.price.toString()),
      days: parseFloat(currentPlan.days.toString()),
    };
    if (
      updatedCurrentPlan.name.toString().trim() === "" ||
      updatedCurrentPlan.pill.toString().trim() === "" ||
      isNaN(updatedCurrentPlan.price) ||
      isNaN(updatedCurrentPlan.days)
    ) {
      if (isNaN(updatedCurrentPlan.price) || isNaN(updatedCurrentPlan.days)) {
        // toast.custom((t) => (
        //   <div className="m-4 flex items-center justify-center rounded-md bg-gray-200 p-4">
        //     <div className="flex flex-col gap-4">
        //       <h1>
        //         <>
        //           <p className="mb-2">Please enter valid inputs.</p>
        //           <p>Price and days must be numbers.</p>
        //         </>
        //       </h1>
        //       <div className="flex flex-row items-center justify-center gap-2">
        //         <Button onClick={() => toast.dismiss(t.id)}>Ok</Button>
        //       </div>
        //     </div>
        //   </div>
        // ));
      } else {
        console.log(currentPlan.name);
        console.log(currentPlan.pill);
        // toast.custom((t) => (
        //   <div className="m-4 flex items-center justify-center rounded-md bg-gray-200 p-4">
        //     <div className="flex flex-col gap-4">
        //       <h1>
        //         <>
        //           <p className="mb-4">Please enter valid inputs.</p>
        //         </>
        //       </h1>
        //       <div className="flex flex-row items-center justify-center gap-2">
        //         <Button onClick={() => toast.dismiss(t.id)}>Ok</Button>
        //       </div>
        //     </div>
        //   </div>
        // ));
      }
      return;
    }

    setCurrentPlan(updatedCurrentPlan);
    let newPlan = updatedCurrentPlan;
    if (newPlan.id) {
      try {
        updatePlan(newPlan);
        // toast.success("Plan Updated");
      } catch (error) {
        // toast.error(error.message);
        console.error(error.message);
      }
    } else {
      try {
        createPlan(newPlan);
        setCurrentPlan(blankPlan);
        // toast.success("Plan Created");
      } catch (error) {
        // toast.error(error.message);
        console.error(error.message);
      }
    }
  };

  const handleShowConfirm = () => {
    // toast((t) => (
    //   <div className="flex flex-col gap-4">
    //     <h1>Are you sure you want to delete?</h1>
    //     <div className="flex flex-row items-center justify-center gap-2">
    //       <Button
    //         onClick={() => {
    //           try {
    //             deletePlan(currentPlan);
    //             setCurrentPlan(blankPlan);
    //             toast.dismiss(t.id);
    //             toast.success("Plan successfully deleted");
    //           } catch (error) {
    //             toast.error(error.message);
    //           }
    //         }}
    //       >
    //         Yes
    //       </Button>
    //       <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
    //     </div>
    //   </div>
    // ));
  };

  return (
    <div className="gap-12 p-8">
      <h1 className="text-h1 mb-8 text-center text-3xl font-semibold">
        {currentPlan.id ? "Edit Plan" : "New Plan"}
      </h1>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Name:</h2>
          <Input
            placeholder="Name"
            value={currentPlan.name}
            handleChange={handleChange("name")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Pill:</h2>
          <Input
            placeholder="Pill"
            value={currentPlan.pill}
            handleChange={handleChange("pill")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Price:</h2>
          <Input
            placeholder="Price"
            value={currentPlan.price.toString()}
            handleChange={handleChange("price")}
          />
        </div>
        <div className="flex w-72 flex-row items-center justify-between">
          <h2 className="text-h2 text-xl font-semibold">Days:</h2>
          <Input
            placeholder="Days"
            value={currentPlan.days.toString()}
            handleChange={handleChange("days")}
          />
        </div>
        <Button className="w-72" onClick={handleSubmit}>
          {currentPlan.id ? "Update Plan" : "Create Plan"}
        </Button>
        <Button
          className="w-72 bg-[#fa5252] hover:bg-[#f03e3e]"
          onClick={handleShowConfirm}
        >
          Delete Plan
        </Button>
      </div>
    </div>
  );
};

const Input = ({ value, placeholder, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-max rounded-md border-2 border-gray-300 p-2 transition focus:border-primary focus:outline-none text-black"
    />
  );
};

export default PlanEditor;
