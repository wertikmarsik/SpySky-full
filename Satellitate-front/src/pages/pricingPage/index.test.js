import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import pricingPage from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(pricingPage); 
    expect(wrapper.exists()).toBe(true);
})