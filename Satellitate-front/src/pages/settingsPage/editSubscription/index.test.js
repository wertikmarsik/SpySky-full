import { it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import subscription from "./index.vue";

it("should mount the component", () => {
    const wrapper = shallowMount(subscription); 
    expect(wrapper.exists()).toBe(true);
})